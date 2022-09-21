import * as SecureStore from 'expo-secure-store';
import { collection, getDoc, getDocs, query, QueryDocumentSnapshot, where, DocumentData } from 'firebase/firestore';
import { auth, firestore} from '../../database/firebase';
import { Entity } from './entity';
/**
 * ChatResponse is a representation of response that has been sent by the
 * backend.
 */
interface ChatResponse {
  from: string;
  to: string;
  date: string;
  id: string;
  msg: string;
}

export class Chat extends Entity {
  public properties = {
    from: '',
    to: '',
    date: '',
    id: '',
    msg: '',
  };

  constructor(
    from?: string,
    to?: string,
    date?: string,
    id?: string,
    msg?: string,
  ) {
    super();

    this.properties.from =
      from !== undefined ? from : '';
    this.properties.to =
      to !== undefined ? to : '';
    this.properties.date = date !== undefined ? date : '';
    this.properties.id = id !== undefined ? id : '';
    this.properties.msg = msg !== undefined ? msg : '';
  }

  static build(response: QueryDocumentSnapshot<DocumentData>): Chat {
    let n = new Chat();

    n.properties.from = response.data().from;
    n.properties.to = response.data().to;
    n.properties.date = response.data().date;
    n.properties.msg = response.data().msg;
    n.properties.id = response.id;

    return n;
  }

  static async all(): Promise<Array<Chat>> {
    let result = Array<Chat>();
    const email = auth.currentUser?.email!;

    const q = query(
      collection(firestore, 'chats'),
      where('to', '==', email));

    try {
      const chats = await getDocs(q);

      chats.forEach((chat) => {
        let newChat = Chat.build(chat)
        result.push(newChat)
      });

      return Promise.resolve(result);
    }
   catch(e) {
      console.error(e);
      return Promise.resolve([]);
  }
}

  static async save(chat: Chat): Promise<Boolean> {
    return Promise.resolve(true);
  }
}
