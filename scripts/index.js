import pubSub from './pubSub';
import { generateHaiku } from './HaikuGenerator';
import Form from './FormComponent';
import Result from './ResultComponent';
import Modal from './ModalComponent';
import Field from './FieldComponent';
import Screen from './ScreenComponent';

Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};

Form(document.getElementById('form'), generateHaiku);
Result();
Modal(document.getElementById('modal'), document.getElementById('main-container'));
Field();
Screen();
