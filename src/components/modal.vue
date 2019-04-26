<template>
  <main :data-open-state="openState" class="modal-wrapper">
    <input :id="name" :ref="name" v-model="isOpen" class="absolute invisible modal-open-toggle" type="checkbox">
    <transition name="modal-anim">
      <section
        v-show="isOpen"
        :class="{ 'modal-active' : isOpen }"
        class="fixed flex flex-col full-height full-width justify-end modal-cont pin-x pin-y z-20"
        role="navigation"
        aria-label="Global Modal"
      >
        <label :for="name" class="bg-black fixed full-height full-width modal-backdrop modal-cont opacity-75 pin-x pin-y" />

        <transition name="modal-content-anim">
          <section v-show="isOpen" class="bg-white modal-content-cont overflow-y-auto relative">
            <label v-if="showCloseBtn" :for="name" class="absolute fa-times fas pin-r pin-t px-4 py-3 text-grey" aria-label="Close" />
            <slot>
              <h1 class="my-8">
                modal window
              </h1>
            </slot>
          </section>
        </transition>
      </section>
    </transition>
  </main>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    openModal: {
      type: Boolean,
      default: false,
    },
    showCloseBtn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    openState() {
      this.$nextTick(() => {
        if (this.menuOpened) {
          document.body.style.overflow = 'hidden';
          document.body.style.height = `${window.innerHeight}px`;
        } else {
          document.body.style.overflow = '';
          document.body.style.height = '';
        }
      });
      return this.isOpen;
    },
  },
  watch: {
    openModal(val) {
      this.isOpen = val;
    },
  },
  mounted() {
    this.isOpen = this.openModal;
  },
};
</script>

<style scoped>
.modal-open-toggle {
  left: -9999px;
}

.modal-content-cont {
  max-height: calc(100% - 85px);
}

.modal-anim-enter-active {
  animation: fade 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-anim-leave-active {
  animation: fade 0.15s ease-out reverse;
  animation-delay: 0.2s;
}

.modal-content-anim-enter-active {
  animation: slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-content-anim-leave-active {
  animation: slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) reverse;
}
@keyframes slide-in {
  0% {
    transform: translate3d(0, 100%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
