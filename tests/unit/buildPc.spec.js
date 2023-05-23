'use strict';
import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import sinon from 'sinon';
import axios from 'axios';
import buildPc from '../../src/components/buildPc.vue';
import chai from './common';

Vue.use(Vuetify);

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

    chai.expect(axiosPostStub.called).to.be.true;
    chai.expect(axiosGetStub.calledOnce).to.be.true;
  });

  // it('Closes modal on button click', async () => {
  //   wrapper.find('.contact-button').trigger('click');
  //   await wrapper.vm.$nextTick();

  //   expect(wrapper.vm.$data.dialog).toBe(false);
  // });
})