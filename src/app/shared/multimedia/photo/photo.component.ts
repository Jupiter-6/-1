import { ApplicationRef, ChangeDetectorRef, Component, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Uppy, UppyFile } from '@uppy/core';
import { DashboardOptions } from '@uppy/dashboard';
import * as dd from 'dingtalk-jsapi';
const Webcam = require('@uppy/webcam');
const ImageEditor = require('@uppy/image-editor');
const zh_CN = require('@uppy/locales/lib/zh_CN');
const XHRUpload = require('@uppy/xhr-upload');


@Component({
  selector: 'multi-media-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit, OnChanges {
  // toggle webcam on/off
  @Input() showWebcam = false;
  @Output() showWebcamChange = new EventEmitter<boolean>();
  @Output() onSeclected = new EventEmitter<{
    [key: string]: UppyFile<any>
  }>();

  props: DashboardOptions = {
    plugins: ['Webcam', 'ImageEditor'],
    proudlyDisplayPoweredByUppy: false,
    closeModalOnClickOutside: true,
    onRequestCloseModal: () => { this.onclose(); },
  }

  uppy!: Uppy;

  constructor(
    private appRef: ApplicationRef,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.showWebcam) {
      if (dd.env.platform !== 'notInDingTalk') {
        dd.biz.util.chooseImage({
          count: 1,
          secret: false,
          onSuccess: (chooseResult: any) => {
            dd.biz.util.compressImage({
              filePaths: chooseResult.filePaths,
              compressLevel: 4,
              onSuccess: async (compressResult: any) => {

                let response = await fetch(compressResult.filePaths[0]);
                let data = await response.blob();
                let metadata = {
                  type: 'image/*'
                };
                let file = new File([data], "test.jpg", metadata);
                this.onSeclected.emit({
                  file: { data: file }
                } as any);
                this.appRef.tick();
              },
              onFail: (err: any) => {
                alert(JSON.stringify(err))
              }
            } as any)
          },
          onFail: (err: any) => {
            console.log(JSON.stringify(err))
          }
        } as any);
        this.onclose();
      }
    }
  }

  ngOnInit(): void {
    this.initUppy();
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
          maxFileSize: 1024 * 1024 * 3,
          maxNumberOfFiles: 1,
          minNumberOfFiles: 1,
          allowedFileTypes: ['image/*']
        },
        locale: {
          strings: {
            ...zh_CN.strings,
            myDevice: '设备上的图片文件',
            uploadXFiles: '确认选中 %{smart_count} 个文件',
            dropPasteImportFiles: '选择图片文件',
            save: '保存变更'
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
          'picture',
        ],
        mirror: false,
        videoConstraints: {
          facingMode: 'environment',
          showRecordingLength: true,
          width: { min: 720, ideal: 1280, max: 1920 },
          height: { min: 480, ideal: 800, max: 1080 },
        },
        preferredVideoMimeType: null,
        preferredImageMimeType: null,
        locale: {
          strings: {
            pluginNameCamera: '拍照'
          }
        }
      })
        .use(ImageEditor, {})
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
