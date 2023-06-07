import mongoose from "mongoose"

export class DB {
  private static uri: string;

  public static Init = (connectionURI?: string) => {
    if (!connectionURI) {
      console.warn("No Database URI Provided... Database NOT Connected...");
      return;
    }
    console.log("Initializing Database...")
    this.SetConnection(connectionURI);
    this.Connect();
  }

  public static SetConnection = (connectionURI: string) => {
    this.uri = connectionURI;
  }

  public static Connect = async () => {
    try {
      await mongoose.connect(this.uri)
      console.log("Connection to DB successful");
      return true;
    } catch (error) {
      console.error("Error when connecting to DB: ", error);
      return false;
    }
  }

  
}