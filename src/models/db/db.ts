import mongoose from 'mongoose';
import {logger} from '../../logger';

export class DB {
  private static uri: string;

  public static Init = (connectionURI?: string) => {
    if (!connectionURI) {
      logger.warn('No Database URI Provided... Database NOT Connected...');
      return;
    }
    logger.debug('Initializing Database...');
    this.SetConnection(connectionURI);
    this.Connect();
  };

  public static SetConnection = (connectionURI: string) => {
    this.uri = connectionURI;
  };

  public static Connect = async () => {
    try {
      await mongoose.connect(this.uri);
      logger.debug('Connection to DB successful');
      return true;
    } catch (error) {
      logger.error('Error when connecting to DB: ', error);
      return false;
    }
  };
}
