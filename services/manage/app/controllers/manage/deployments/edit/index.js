import Controller from '@ember/controller';
import ActionMixin from '@parameter1/email-x-manage/mixins/action-mixin';
import { get } from '@ember/object';
import { ObjectQueryManager } from 'ember-apollo-client';

import deploymentName from '@parameter1/email-x-manage/gql/mutations/deployment/name';
import deploymentPublisher from '@parameter1/email-x-manage/gql/mutations/deployment/publisher';
import deleteDeployment from '@parameter1/email-x-manage/gql/mutations/deployment/delete';

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
        await this.get('apollo').mutate({ mutation: deploymentName, variables }, 'deploymentName');
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
    async setPublisher({ value }) {
      this.startAction();
      const input = { id: this.get('model.id'), value: get(value, 'id') };
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation: deploymentPublisher, variables }, 'deploymentPublisher');
      } catch (e) {
        throw this.get('graphErrors').handle(e);
      } finally {
        this.endAction();
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
      const mutation = deleteDeployment;
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'deleteDeployment');
        await this.transitionToRoute('manage.deployments.index');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
        this.set('isDeleting', false);
      }
    },
  },
});
