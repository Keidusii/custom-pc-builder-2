'use strict';
import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import sinon from 'sinon';
import axios from 'axios';
import NavBar from '../../src/components/NavBar.vue';
import chai from './common';
import VueSmoothScroll from 'vue2-smooth-scroll';
import { FETCH_CART_RESPONSE } from '@/shared/TestCart';

Vue.use(VueSmoothScroll)
Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify()
});

describe('navbar.vue', () => {
  let vuetify, componentData, axiosGetStub, axiosPostStub, axiosDeleteStub;

  const cart = {
    data: FETCH_CART_RESPONSE
  }

  const deleteFetch = { 
    data: cart.data.slice(0,2)
  };

  beforeEach(() => {
    vuetify = new Vuetify();
    componentData = {
      cartDialog: true,
    };

    axiosGetStub = sinon.stub(axios, 'get');
    axiosPostStub = sinon.stub(axios, 'post');
    axiosDeleteStub = sinon.stub(axios, 'delete');
  });

  afterEach(()=> {
    axiosGetStub.restore();
    axiosPostStub.restore();
    axiosDeleteStub.restore();
  })

  it('Fetches the cart on load', async () => {
    axiosGetStub.resolves(cart);
    const wrapper = await mount(NavBar, {
      vuetify,
    });

    const cartLength = wrapper.vm._computedWatchers.cart.value.length;

    chai.expect(axiosGetStub.calledOnce).to.be.true;
    chai.expect(cartLength).to.equal(3);
  });

  it('Deletes item from cart on button click', async () => {
    axiosGetStub.onFirstCall().resolves(cart);
    axiosGetStub.onSecondCall().resolves(deleteFetch);
    axiosDeleteStub.resolves({});
    
    const wrapper = await mount(NavBar, {
      vuetify,
      data() {
        return { cartDialog: true }
      }
    });

    wrapper.find('.remove-button').trigger('click');
    await wrapper.vm.$nextTick();
    
    chai.expect(axiosDeleteStub.calledOnce).to.be.true;
    chai.expect(axiosGetStub.calledTwice).to.be.true;
  });

  it('Displays proper text when cart is empty', async () => {
    axiosGetStub.resolves({data: []});
    const wrapper = await mount(NavBar, {
      vuetify,
      data() {
        return componentData;
      }
    });
    
    const cartLength = wrapper.vm._computedWatchers.cart.value.length;

    chai.expect(axiosGetStub.calledOnce).to.be.true;
    chai.expect(cartLength).to.equal(0);
    chai.expect(wrapper.find('.cart-empty').text()).to.match(new RegExp('Cart is Empty'));
  });

  it('Displays proper amount of cart items', async () => {
    axiosGetStub.resolves(cart);
    const wrapper = await mount(NavBar, {
      vuetify,
      data() {
        return componentData;
      }
    });

    const cartDivs = wrapper.findAll('.cart-item');
    const cartLength = wrapper.vm._computedWatchers.cart.value.length;

    chai.expect(axiosGetStub.calledOnce).to.be.true;
    chai.expect(cartLength).to.equal(3);
    chai.expect(cartDivs.length).to.equal(cartLength);
  });

  it('Displays cart modal on button click', async () => {
    axiosGetStub.resolves(cart);
    const wrapper = await mount(NavBar, {
      vuetify,
      data() {
        return { cartDialog: false };
      }
    });

    wrapper.find('.open-cart').trigger('click');
    await wrapper.vm.$nextTick();

    chai.expect(axiosGetStub.calledOnce).to.be.true;
    chai.expect(wrapper.vm.$data.cartDialog).to.be.true;
    chai.expect(wrapper.find('.cart-title').text()).to.match(new RegExp('Cart'));
  });

  it('Closes cart modal on button click', async () => {
    axiosGetStub.resolves(cart);
    const wrapper = await mount(NavBar, {
      vuetify,
      data() {
        return componentData;
      }
    });

    wrapper.find('.close-cart').trigger('click');
    await wrapper.vm.$nextTick();

    chai.expect(axiosGetStub.calledOnce).to.be.true;
    chai.expect(wrapper.vm.$data.cartDialog).to.be.false;
  });

  it('Displays badge when cart is not empty', async () => {
    axiosGetStub.resolves(cart);
    const wrapper = await mount(NavBar, {
      vuetify,
      data() {
        return componentData;
      }
    });
    const cartLength = wrapper.vm._computedWatchers.cart.value.length;

    chai.expect(axiosGetStub.calledOnce).to.be.true;
    chai.expect(cartLength).to.equal(3);
    chai.expect(wrapper.find('.badge').text()).to.match(new RegExp('3'));
  });
})
