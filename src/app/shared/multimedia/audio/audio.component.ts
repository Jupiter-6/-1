import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Uppy, UppyFile } from '@uppy/core';
import { DashboardOptions } from '@uppy/dashboard';
import * as dd from 'dingtalk-jsapi';
const Audio = require('@uppy/audio');
const zh_CN = require('@uppy/locales/lib/zh_CN');
const XHRUpload = require('@uppy/xhr-upload');

@Component({
  selector: 'multi-media-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit, OnChanges {
  @ViewChild('audioPicker', { static: true }) private audioPicker!: ElementRef;
  // toggle webcam on/off
  @Input() showWebcam = false;
  @Output() showWebcamChange = new EventEmitter<boolean>();
  @Output() onSeclected = new EventEmitter<{
    [key: string]: UppyFile<any>
  }>();

  props: DashboardOptions = {
    plugins: ['Audio'],
    proudlyDisplayPoweredByUppy: false,
    closeModalOnClickOutside: true,
    onRequestCloseModal: () => { this.onclose(); },
  }

  uppy!: Uppy;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.showWebcam) {
      if (dd.env.platform !== 'notInDingTalk') {
        this.audioPicker.nativeElement.click()

        setTimeout(() => {
          this.onclose();
        });
      }
    }
  }

  ngOnInit(): void {
    this.initUppy();
    this.audioPicker.nativeElement
      .addEventListener('change', (event: any) => {
        this.onSeclected.emit({
          file: { data: event.target.files[0] }
        } as any);
      })
  }
  initUppy() { 
    if (dd.env.platform !== 'notInDingTalk') {
      return false;
    }
    setTimeout(() => {
      this.uppy = new Uppy({
        debug: true,
        autoProceed: false,
        restrictions: {
          maxFileSize: 1024 * 1024 * 5,
          maxNumberOfFiles: 1,
          minNumberOfFiles: 1,
          allowedFileTypes: ['audio/*']
        },
        locale: {
          strings: {
            ...zh_CN.strings,
            myDevice: '设备上的音频文件',
            uploadXFiles: '确认选中 %{smart_count} 个文件',
            dropPasteImportFiles: '选择音频文件',
          }
        },
        onBeforeUpload: (files: {
          [key: string]: UppyFile<any>
        }) => {
          this.onSeclected.emit(files);
          this.onclose();
          this.uppy.cancelAll();
          return false;
        }
      })
        .use(Audio, {
          locale: {
            strings: {
              pluginNameAudio: '录音机'
            }
          },
        })
        .use(XHRUpload, {});
    });
    return true;
  }
  /** 关闭 */
  onclose() {
    this.showWebcam = false;
    this.showWebcamChange.emit(this.showWebcam);
  }
}
