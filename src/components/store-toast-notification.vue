<template>
  <section :class="{ 'slim-toast-notification-active': !toast.showBot }" class="toast-notification-component">
    <div :class="{ 'active': toast.notifications.length }" class="floated-chat-w fixed">
      <section v-if="!toast.showBot" class="slim-toast-notification center">
        <transition-group name="list" tag="p">
          <div
            v-for="(notification, index) in toast.notifications"
            :key="index + 1"
            :class="getNotificationColor(notification.type)"
            class="mb-2 px-4 py-3 rounded text-center text-red-dark text-sm shadow border"
          >
            <p>{{ notification.text }}</p>
          </div>
        </transition-group>
      </section>
      <div v-else class="floated-chat-i">
        <div class="chat-close">
          <i class="os-icon os-icon-close" />
        </div>
        <div class="chat-head">
          <div class="user-w">
            <div class="user-avatar-w">
              <div class="user-avatar center">
                <i class="os-icon os-icon-robot-2" />
              </div>
            </div>
            <div class="user-name">
              <h6 class="user-title">
                Genpact Bot
              </h6>
              <div class="user-role">
                Account Notifications Manager
              </div>
            </div>
          </div>
        </div>
        <div class="chat-messages ps ps--theme_default">
          <div v-for="(notification, index) in toast.notifications" :key="index" class="message">
            <div class="message-content">
              <i :class="getNotificationColor(notification.type)" class="status-pill mr1" />
              {{ notification.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'StoreToastNotification',
  computed: {
    ...mapGetters(['toast']),
  },
  methods: {
    getNotificationColor(type) {
      if (type === 'error') {
        return 'bg-red-lightest border-red-light';
      }
      return 'bg-green-lightest text-green-dark';
    },
  },
};
</script>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: transform 0.15s, opacity 0.15s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(15px);
}
.toast-notification-component {
  z-index: 9999999;
  .floated-chat-w {
    bottom: 15px;
  }
  .user-avatar {
    .os-icon-robot-2 {
      font-size: 2.4rem;
    }
  }
  .user-w .user-name {
    padding-left: 15px;
  }
  .chat-messages {
    height: 200px;
    overflow-y: auto;
  }

  &.slim-toast-notification-active {
    .floated-chat-w {
      top: 50px;
      left: 50%;
      right: auto;
      bottom: auto;
      width: auto;
      min-width: 80%;
      transform: translate(-50%, -20px);
      line-height: 1.2rem;

      &.active {
        transform: translate(-50%, 0);
      }
    }
  }
}
</style>
