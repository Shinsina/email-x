import Route from '@ember/routing/route';
import ListRouteMixin from '@parameter1/email-x-manage/mixins/list-route-mixin';

import query from '@parameter1/email-x-manage/gql/queries/adunit/list-for-publisher';
import search from '@parameter1/email-x-manage/gql/queries/adunit/match-for-publisher';

export default Route.extend(ListRouteMixin, {
  /**
   *
   * @param {object} params
   */
  model({ limit, field, order, phrase, searchType, searchBy }) {
    const input = {
      publisherId: this.modelFor('manage.publishers.edit').id,
    };
    return this.getResults({
      query,
      queryKey: 'adunitsForPublisher',
      queryInput: input,
      search,
      searchKey: 'matchAdUnitsForPublisher',
      searchInput: input,
    }, { limit, field, order, phrase, searchType, searchBy });
  },
});
