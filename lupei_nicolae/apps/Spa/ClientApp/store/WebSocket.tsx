import { HubConnection, HubConnectionBuilder, HttpTransportType } from "@aspnet/signalr";
import UserStore from "./UserStore";

export default class WebSocket {
    /**
     * Connection
     */
    private readonly hubConnection: HubConnection;
    /**
     * Constructor
     */
    constructor() {
        //current user
        const user = UserStore.getUser();
        const builder = new HubConnectionBuilder();
        // as per setup in the startup.cs
        this.hubConnection = builder.withUrl("http://localhost:5100/rtn", HttpTransportType.WebSockets | HttpTransportType.LongPolling).build();

        // message coming from the server
        this.hubConnection.on("OnReceive", (sender: any, message: string) => {
            
        });

        // starting the connection
        this.hubConnection.start().then(() => {
            this.hubConnection.invoke("OnLoad", user.profile.sub);
        });
    }
    /**
     * Disconnect
     */
    public disconnect(): void {
        this.hubConnection.stop();
    }
    /**
     * Send message
     * @param message
     */
    public sendMessage(message: string): void {
        this.hubConnection.invoke("SendMessage", message);
    }
    public register(): HubConnection {
        return this.hubConnection;
    }
}