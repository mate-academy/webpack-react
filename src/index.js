document.addEventListener('click', () => {
  import(/* webpackChunkName: "debonce" */ 'lodash/debounce')
    .then((debounce) => {
      console.log(debounce);
    });
}, 10000);
