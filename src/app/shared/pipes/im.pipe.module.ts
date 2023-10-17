import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterPipe } from './counter.pipe';
import { PercentagePipe } from './percentage.pipe';
import { ExpiredPipe } from './expired.pipe';
import { ExpiredStrPipe } from './expired-str.pipe';
import { CompletionStrPipe } from './completion-str.pipe';
import { FixedPipe } from './fixed.pipe';
import { FormatPipe } from './formatDate.pipe';
import { AsyncSelectKeyPipe } from './async-select-key.pipe';


@NgModule({
  declarations: [
    CounterPipe,
    PercentagePipe,
    ExpiredPipe,
    ExpiredStrPipe,
    CompletionStrPipe,
    FixedPipe,
    FormatPipe,
    AsyncSelectKeyPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CounterPipe,
    PercentagePipe,
    ExpiredPipe,
    ExpiredStrPipe,
    CompletionStrPipe,
    FixedPipe,
    FormatPipe,
    AsyncSelectKeyPipe
  ]
})
export class ImPipeModule { }
