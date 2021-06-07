import Mixin from '@ember/object/mixin';
import RouteObservableMixin from '@parameter1/email-x-manage/mixins/route-observable-mixin';

export default Mixin.create(RouteObservableMixin, {
  /**
   *
   * @param {*} queryOptions
   * @param {*} params
   */
  async search({ query, resultKey, queryInput }, { searchBy, phrase, searchType, pagination }) {
    const input = {
      pagination,
      field: searchBy,
      phrase,
      position: searchType,
      ...queryInput
    }
    const variables = { input };

    this.getController().set('resultKey', resultKey);
    try {
      const response = await this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, resultKey);
      this.getController().set('observable', this.getObservable(response));
      return response;
    } catch (e) {
      this.get('graphErrors').show(e)
    }
  },
});
