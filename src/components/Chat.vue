<template>
    <div class="chat container">
        <h2 class="center teal-text">Ninja Chat</h2>

        <div class="card">
            <div class="card-content">
                <ul class="messages" v-chat-scroll>
                    <li v-for="(message, index) in messages" :key="index">
                        <span class="teal-text">{{ message.name }}</span>
                        <span class="grey-text text-darken-3 message">{{ message.content }}</span>
                        <span class="grey-text time">{{ message.timestamp }}</span>
                    </li>
                </ul>
            </div>

            <div class="card-action">
                <NewMessage :name="name" />
            </div>
        </div>
    </div>
</template>

<script>
    import NewMessage from './NewMessage';
    import firebaseApp from '../firebase/init';
    import moment from 'moment';

    export default {
        name: "Chat",
        props: ['name'],
        components: {
            NewMessage
        },
        data() {
            return {
                messages: []
            }
        },
        created() {
            const ref = firebaseApp
                .collection('messages')
                .orderBy('timestamp');

            ref.onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added') {
                        const { doc }  = change;
                        const { id } = doc;
                        const { name, content, timestamp } = doc.data();

                        this.messages.push({
                            id,
                            name,
                            content,
                            timestamp: moment(timestamp).format('lll')
                        });
                    }
                })
            });
        }
    }
</script>

<style scoped>
    .chat h2 {
        font-size: 2.6em;
        margin-bottom: 40px;
    }
    .chat span {
        font-size: 1.4em;
    }
    .chat .message {
        margin-left: 10px;
    }
    .chat .time {
        display: block;
        font-size: 0.8em;
    }
    .messages {
        max-height: 400px;
        overflow: auto;
    }
    .messages::-webkit-scrollbar {
        width: 3px;
    }
    .messages::-webkit-scrollbar-track {
        background: #ddd;
    }
    .messages::-webkit-scrollbar-thumb {
        background: #aaa;
    }
</style>