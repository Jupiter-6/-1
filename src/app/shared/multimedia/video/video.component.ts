import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Uppy, UppyFile } from '@uppy/core';
import { DashboardOptions } from '@uppy/dashboard';
import * as dd from 'dingtalk-jsapi';
const Webcam = require('@uppy/webcam');
const zh_CN = require('@uppy/locales/lib/zh_CN');
const XHRUpload = require('@uppy/xhr-upload');

@Component({
  selector: 'multi-media-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, OnChanges {
  @ViewChild('videoPicker', { static: true }) private videoPicker!: ElementRef;
  // toggle webcam on/off
  @Input() showWebcam = false;
  @Output() showWebcamChange = new EventEmitter<boolean>();
  @Output() onSeclected = new EventEmitter<{
    [key: string]: UppyFile<any>
  }>();

  props: DashboardOptions = {
    plugins: ['Webcam'],
    proudlyDisplayPoweredByUppy: false,
    closeModalOnClickOutside: true,
    onRequestCloseModal: () => { this.onclose(); },
  }

  uppy!: Uppy

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.showWebcam) {
      if (dd.env.platform !== 'notInDingTalk') {
        this.videoPicker.nativeElement.click()

        setTimeout(() => {
          this.onclose();
        });
      }
    }
  }

  ngOnInit(): void {
    this.initUppy();
    this.videoPicker.nativeElement
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
          allowedFileTypes: ['video/*']
        },
        locale: {
          strings: {
            ...zh_CN.strings,
            myDevice: '设备上的视频文件',
            uploadXFiles: '确认选中 %{smart_count} 个文件',
            dropPasteImportFiles: '选择视频文件',
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
      }).use(Webcam, {
        onBeforeSnapshot: () => Promise.resolve(),
        countdown: false,
        modes: [
          'video-audio',
          'video-only'
        ],
        mirror: false,
        videoConstraints: {
          facingMode: 'environment',
          showRecordingLength: true,
          width: { min: 720, ideal: 1280, max: 1920 },
          height: { min: 480, ideal: 800, max: 1080 },
        },
        showRecordingLength: true,
        preferredVideoMimeType: null,
        preferredImageMimeType: null,
        locale: {
          strings: {
            pluginNameCamera: '相机'
          }
        },
      })
        .use(XHRUpload, {})
    });
    return true;
  }
  /** 关闭 */
  onclose() {
    this.showWebcam = false;
    this.showWebcamChange.emit(this.showWebcam);
  }
}
