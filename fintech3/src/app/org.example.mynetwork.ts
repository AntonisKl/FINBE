import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.mynetwork{
   export class ClientInfo extends Asset {
      clientId: string;
      name: string;
      surname: string;
      idNumber: string;
      placeofBirth: string;
      placeofResidence: string;
      profession: string;
      telNumber: string;
      income: number;
      banks: Bank[];
   }
   export class Bank extends Participant {
      bankId: string;
      name: string;
      swiftCode: string;
   }
   export class ClientInfoTransfer extends Transaction {
      clientInfo: ClientInfo;
      toBank: Bank;
   }
   export class KYCNotification extends Event {
      clientInfo: ClientInfo;
   }
// }
