// 'use strict';
// import { mount } from '@vue/test-utils';
// import Vue from 'vue';
// import Vuetify from 'vuetify';
// import ContactUs from '../../src/components/contactUs.vue';
// import chai from './common';

// Vue.use(Vuetify);

// new Vue({
//   vuetify: new Vuetify()
// });

// describe('contactUs.vue', () => {
//   let vuetify, wrapper, componentData;

//   beforeEach(() => {
//     componentData = {
//       dialog: false,
//     };
//     vuetify = new Vuetify();
//     wrapper = mount(ContactUs, {
//       vuetify,
//       data() {
//         return componentData;
//       }
//     });
//   });

//   it('Opens modal on button click', async () => {
//     wrapper.find('.web-button').trigger('click');
//     await wrapper.vm.$nextTick();

//     chai.expect(wrapper.vm.$data.dialog).toBe(true);
//     chai.expect(wrapper.find('div.contact-info').text())
//       .toMatch(new RegExp('support@custompcbuilder.com'));
//   });

//   it('Closes modal on button click', async () => {
//     const wrapper = mount(ContactUs, {
//       vuetify,
//       data() {
//         return {
//           dialog: true
//         };
//       }
//     });

//     wrapper.find('.contact-button').trigger('click');
//     await wrapper.vm.$nextTick();

//     chai.expect(wrapper.vm.$data.dialog).toBe(false);
//   });
// })