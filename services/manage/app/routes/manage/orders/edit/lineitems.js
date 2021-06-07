import Route from '@ember/routing/route';
import ListRouteMixin from '@parameter1/email-x-manage/mixins/list-route-mixin';

import query from '@parameter1/email-x-manage/gql/queries/lineitem/list-for-order';
import search from '@parameter1/email-x-manage/gql/queries/lineitem/match-for-order';

export default Route.extend(ListRouteMixin, {
  /**
   *
   * @param {object} params
   */
  model({ limit, field, order, phrase, searchType, searchBy }) {
    const input = {
      orderId: this.modelFor('manage.orders.edit').id,
    };
    return this.getResults({
      query,
      queryKey: 'lineitemsForOrder',
      queryInput: input,
      search,
      searchKey: 'matchLineItemsForOrder',
      searchInput: input,
    }, { limit, field, order, phrase, searchType, searchBy });
  },

  setupController(controller, model) {
    controller.set('orderModel', this.modelFor('manage.orders.edit'));
    this._super(controller, model);
  },
});
