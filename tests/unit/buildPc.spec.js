'use strict';
import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import sinon from 'sinon';
import axios from 'axios';
import buildPc from '../../src/components/buildPc.vue';
import chai from './common';
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);
Vue.use(Vuetify);
document.body.setAttribute('data-app', true)

new Vue({
  vuetify: new Vuetify()
});

describe('buildPc.vue', () => {
  let vuetify, componentData, wrapper, axiosGetStub, axiosPostStub;

  beforeEach(() => {
    vuetify = new Vuetify();
    componentData = {
      dialog: false,
    };
    
    axiosGetStub = sinon.stub(axios, 'get');
    axiosPostStub = sinon.stub(axios, 'post');
    wrapper = mount(buildPc, {
      vuetify,
      data() {
        return componentData;
      }
    });
  });

  afterEach(()=> {
    axiosGetStub.restore();
    axiosPostStub.restore();
  })

  it('Adds to cart on button click', async () => {
    wrapper.find('.buy-now-btn').trigger('click');
    await wrapper.vm.$nextTick();
    axiosGetStub.resolves({});
    axiosPostStub.resolves({});

    chai.expect(axiosPostStub.calledOnce).to.be.true;
    chai.expect(axiosGetStub.calledOnce).to.be.true;
  });

  it('Opens customize dialog on button click', async () => {
    wrapper.find('.customize-btn').trigger('click');
    await wrapper.vm.$nextTick();

    chai.expect(wrapper.vm.$data.dialog0).to.be.true;
  });
})
