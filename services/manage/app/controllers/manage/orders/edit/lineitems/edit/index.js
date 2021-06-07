import Controller from '@ember/controller';
import ActionMixin from '@parameter1/email-x-manage/mixins/action-mixin';
import { get } from '@ember/object';
import { ObjectQueryManager } from 'ember-apollo-client';

import lineitemName from '@parameter1/email-x-manage/gql/mutations/lineitem/name';
import lineitemNotes from '@parameter1/email-x-manage/gql/mutations/lineitem/notes';
import lineitemPriority from '@parameter1/email-x-manage/gql/mutations/lineitem/priority';
import lineitemAdUnits from '@parameter1/email-x-manage/gql/mutations/lineitem/adunits';
import lineitemDeployments from '@parameter1/email-x-manage/gql/mutations/lineitem/deployments';
import lineitemPublishers from '@parameter1/email-x-manage/gql/mutations/lineitem/publishers';
import lineitemDateDays from '@parameter1/email-x-manage/gql/mutations/lineitem/date-days';
import lineitemDateRange from '@parameter1/email-x-manage/gql/mutations/lineitem/date-range';
import deleteLineItem from '@parameter1/email-x-manage/gql/mutations/lineitem/delete';
import pauseLineItem from '@parameter1/email-x-manage/gql/mutations/lineitem/pause';
import cloneLineItem from '@parameter1/email-x-manage/gql/mutations/lineitem/clone';

export default Controller.extend(ObjectQueryManager, ActionMixin, {
  actions: {
    /**
     *
     * @param {string} params.value
     */
    async setName({ value }) {
      this.startAction();
      const input = { id: this.get('model.id'), value };
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation: lineitemName, variables }, 'lineitemName');
      } catch (e) {
        throw this.get('graphErrors').handle(e);
      } finally {
        this.endAction();
      }
    },

    /**
     *
     * @param {string} params.value
     */
    async setNotes({ value }) {
      this.startAction();
      const input = { id: this.get('model.id'), value };
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation: lineitemNotes, variables }, 'lineitemNotes');
      } catch (e) {
        throw this.get('graphErrors').handle(e);
      } finally {
        this.endAction();
      }
    },

    async setAdUnits({ value }) {
      this.startAction();
      const input = { id: this.get('model.id'), value: value.map(v => v.id) };
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation: lineitemAdUnits, variables }, 'lineitemAdUnits');
      } catch (e) {
        throw this.get('graphErrors').handle(e);
      } finally {
        this.endAction();
      }
    },

    async setDeployments({ value }) {
      this.startAction();
      const input = { id: this.get('model.id'), value: value.map(v => v.id) };
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation: lineitemDeployments, variables }, 'lineitemDeployments');
      } catch (e) {
        throw this.get('graphErrors').handle(e);
      } finally {
        this.endAction();
      }
    },

    async setPublishers({ value }) {
      this.startAction();
      const input = { id: this.get('model.id'), value: value.map(v => v.id) };
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation: lineitemPublishers, variables }, 'lineitemPublishers');
      } catch (e) {
        throw this.get('graphErrors').handle(e);
      } finally {
        this.endAction();
      }
    },

    async setPriority(event) {
      this.startAction();
      const input = { id: this.get('model.id'), value: parseInt(event.target.value, 10) };
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation: lineitemPriority, variables }, 'lineitemPriority');
      } catch (e) {
        throw this.get('graphErrors').handle(e);
      } finally {
        this.endAction();
      }
    },

    async setDays(days) {
      this.startAction();
      const input = { id: this.get('model.id'), days };
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation: lineitemDateDays, variables }, 'lineitemDateDays');
      } catch (e) {
        throw this.get('graphErrors').handle(e);
      } finally {
        this.endAction();
      }
    },

    async setRange({ start, end }) {
      this.set('model.dates.start', start);
      this.set('model.dates.end', end);
      if (start && end) {
        this.startAction();
        const input = { id: this.get('model.id'), start, end };
        const variables = { input };
        try {
          await this.get('apollo').mutate({ mutation: lineitemDateRange, variables }, 'lineitemDateRange');
        } catch (e) {
          throw this.get('graphErrors').handle(e);
        } finally {
          this.endAction();
        }
      }
    },

    /**
     *
     */
    async setPaused({ value }) {
      this.startAction();
      const input = { id: this.get('model.id'), value };
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation: pauseLineItem, variables }, 'pauseLineItem');
      } catch (e) {
        throw this.get('graphErrors').handle(e);
      } finally {
        this.endAction();
      }
    },

    /**
     *
     */
    async clone() {
      this.startAction();
      this.set('isCloning', true);
      const id = this.get('model.id');
      const variables = { input: { id } };
      const mutation = cloneLineItem;
      try {
        const refetchQueries = ['LineItemListForOrder', 'MatchLineItemListForOrder'];
        const lineitem = await this.get('apollo').mutate({ mutation, variables, refetchQueries }, 'cloneLineItem');
        await this.transitionToRoute('manage.orders.edit.lineitems.edit.index', get(lineitem, 'order.id'), get(lineitem, 'id'));
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
        this.set('isCloning', false);
      }
    },

    /**
     *
     */
    async delete() {
      this.startAction();
      this.set('isDeleting', true);
      const id = this.get('model.id');
      const variables = { input: { id } };
      const mutation = deleteLineItem;
      try {
        const refetchQueries = ['LineItemListForOrder', 'MatchLineItemListForOrder'];
        await this.get('apollo').mutate({ mutation, variables, refetchQueries }, 'deleteLineItem');
        await this.transitionToRoute('manage.orders.edit.lineitems', this.get('model.order.id'));
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
        this.set('isDeleting', false);
      }
    },
  },
});
