import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals = [];

  add(currentModal: any) {
    this.modals.push(currentModal);
  }

  open(id: string, comp, event?) {
    const currentModal = this.modals.find(modal => modal.id === id);
    currentModal.open(event, comp);
  }

  close(id: string) {
    const currentModal = this.modals.find(modal => modal.id === id);
    currentModal.close();
  }
}
