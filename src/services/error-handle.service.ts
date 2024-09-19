import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(
    private modalService: ModalService
  ) {}

  /**
   * 注意事項：
   * 如果errorCode有mapping的i18n，msg以i18n為主
   * 如需使用errorMessage param，請先刪除18n
   */
  errorModalShow(errorCode: string = '', errorMessage: string = '') {
    const message = `${errorMessage} (${errorCode})`
    this.modalService.showInfoModal({message})
  }




}
