import createRouter from 'router5';
import listenersPlugin from 'router5/plugins/listeners';
import browserPlugin from 'router5/plugins/browser';
import routes from './routes';

export default function configureRouter(useListenersPlugin = false) {
  const router = createRouter(routes, {
    defaultRoute: 'inbox'
  })
  // Plugins
  .usePlugin(browserPlugin({
    useHash: false
  }));

  // Required for Links
  if (useListenersPlugin) {
    router.usePlugin(listenersPlugin());
  }

  return router;
}
