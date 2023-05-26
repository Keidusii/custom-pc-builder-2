'use strict';
import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import ContactUs from '../../src/components/contactUs.vue';
import chai from './common';

Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify()
});

describe('contactUs.vue', () => {
  let vuetify, wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(ContactUs, {
      vuetify,
      data() {
        return { dialog: false };
      }
    });
  });

  it('Opens modal on button click', async () => {
    wrapper.find('.open-contact').trigger('click');
    await wrapper.vm.$nextTick();

    chai.expect(wrapper.vm.$data.dialog).to.be.true;
    chai.expect(wrapper.find('div.contact-info').text())
      .to.match(new RegExp('support@custompcbuilder.com'));
  });

  it('Closes modal on button click', async () => {
    wrapper = mount(ContactUs, {
      vuetify,
      data() {
        return { dialog: true };
      }
    });
    wrapper.find('.close-contact').trigger('click');
    await wrapper.vm.$nextTick();

    chai.expect(wrapper.vm.$data.dialog).to.be.false;
  });
})