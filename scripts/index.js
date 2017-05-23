import pubSub from './pubSub';
import { generateHaiku } from './HaikuGenerator';
import Form from './FormComponent';
import Result from './ResultComponent';
import Modal from './ModalComponent';
import Field from './FieldComponent';
import Screen from './ScreenComponent';
import Input from './InputComponent';
import Share from './ShareComponent';

Form(document.getElementById('form'), generateHaiku);
Input();
Result();
Field();
Screen();
Share();
