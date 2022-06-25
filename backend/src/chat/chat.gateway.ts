import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer()
    server: Server;

    userList = [];
    chatList = [];

    async handleConnection(client: Socket, ...args: any[]) {
        console.log("Socket Connected-Server");
    }

    async handleDisconnect(client: any) {
        for (var item of this.userList)
        {
            if (item.id == client.id)
            {
                let index = this.userList.indexOf(item);
                let ment = `${this.userList[index].content} 님이 나가셨습니다.`;
                this.server.emit('addNotice', { content: ment, isNotice: 1 });
                this.chatList.push({ content: ment, isNotice: 1 });
                this.userList.splice(index, 1);
            }
        }
        this.server.emit('reloadUserList', this.userList);
    }

    @SubscribeMessage('login')
    addUser(client: Socket, nickName: string): void {
        for (var item of this.userList)
        {
            if (item.content == nickName)
            {
                client.emit('existUser');
                return ;
            }
        }
        this.userList.push({id: client.id, content: nickName});
        this.server.emit('reloadUserList', this.userList);
        client.emit('reloadChatList', this.chatList);
        client.emit('successLogin', this.chatList);
    }

    @SubscribeMessage('sendChat')
    submitChat(client: Socket, message: string): void {
        this.chatList.push({ content: message, isNotice: 0 });
        this.server.emit("addChat", { content: message, isNotice: 0 });
    }

    @SubscribeMessage('sendNotice')
    noticeMessage(client: Socket, message): void{
        this.chatList.push({ content: message, isNotice: 1 });
        this.server.emit('addNotice', { content: message, isNotice: 1 });
    }

}
