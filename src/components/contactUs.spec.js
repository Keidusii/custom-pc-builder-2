'use strict';
import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import ContactUs from './contactUs.vue';

Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify()
});

describe('contactUs.vue', () => {
  let vuetify, componentData;

  beforeEach(() => {
    componentData = {
      htmlObj: {
        icon: { text: null, class: null }
      }
    };
    vuetify = new Vuetify();
  });

  it('Opens modal on button click', async () => {
    const wrapper = mount(ContactUs, {
      vuetify,
      propsData: {
        view: 'forgot-pass-email-sent'
      },
      data() {
        return componentData;
      }
    });
    expect(wrapper.find('.confirmation-text').exists()).to.be.true;
    expect(wrapper.vm.$data.htmlObj.icon.text).to.match(new RegExp('check-circle'));
    expect(wrapper.vm.$data.htmlObj.icon.class).to.match(new RegExp('modal-icon'));
  });

  it('Uses correct styles when the email failed to send', async () => {
    const wrapper = mount(ContactUs, {
      vuetify,
      propsData: {
        view: 'sign-up-email-failure'
      },
      data() {
        return componentData;
      }
    });
    expect(wrapper.find('.failure-text').exists()).to.be.true;
    expect(wrapper.vm.$data.htmlObj.icon.text).to.match(new RegExp('times-circle'));
    expect(wrapper.vm.$data.htmlObj.icon.class).to.match(new RegExp('modal-icon'));
  });
});
