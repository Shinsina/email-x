import Route from '@ember/routing/route';
import ListRouteMixin from '@parameter1/email-x-manage/mixins/list-route-mixin';

import query from '@parameter1/email-x-manage/gql/queries/user/list';
import search from '@parameter1/email-x-manage/gql/queries/user/match';

export default Route.extend(ListRouteMixin, {
  /**
   *
   * @param {object} params
   */
  model({ limit, field, order, phrase, searchType, searchBy }) {
    return this.getResults({
      query,
      queryKey: 'users',
      search,
      searchKey: 'matchUsers',
    }, { limit, field, order, phrase, searchType, searchBy });
  },
});
