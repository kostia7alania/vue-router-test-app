import guestMiddleware from "./middleware/guestMiddleware";
import authMiddleware from "./middleware/authMiddleware";
import subscribersMiddleware from "./middleware/subscribersMiddleware";

const MainBoard = () =>
  import(/* webpackChunkName: "MainBoard" */ "@/pages/MainBoard");
const BoardComponent = () =>
  import(
    /* webpackChunkName: "BoardComponent" */ "@/components/board/BoardComponent"
  );

const clearAndUpper = (text) => text.replace(/-/, "").toUpperCase();
const toPascalCase = (text) => text.replace(/(^\w|-\w)/g, clearAndUpper);

const genAuthRoutes = ({ parent, tabs = [] }) => ({
  path: `/${parent}`,
  name: parent,
  component: () => import(/* webpackChunkName: "auth" */ "@/pages/Auth"),
  redirect: { name: tabs[0] },

  children: tabs.map((tab) => {
    const tabPascalCase = toPascalCase(tab);
    return {
      path: tab,
      name: tab,
      component: () =>
        import(
          /* webpackChunkName: "[request]" */ `@/components/${parent}/${tabPascalCase}`
        ),
      meta: {
        title: "Зона авторизации",
        middleware: {
          ignore: [authMiddleware],
          attach: [guestMiddleware],
        },
      },
    };
  }),
});

const routes = [
  genAuthRoutes({ parent: "auth", tabs: ["login", "register", "forgot"] }),
  {
    path: "/",
    name: "main",
    component: MainBoard,
    meta: {
      title: "Главная страница",
    },
    children: [
      {
        path: "/board",
        name: "board",
        meta: {
          title: "Страница борда",
        },
        component: {
          render: (h) => h("div", ["Board Page", h("router-view")]),
        },
        children: [
          {
            path: "/board/:id",
            name: "board-child",
            component: BoardComponent,
            props: true,
            meta: {
              title: "Страница борда с пропсами",
            },
            children: [
              {
                path: "child",
                components: {
                  default: { render: (h) => h("div", ["I'm Default"]) },
                  user: { render: (h) => h("div", ["I'm User"]) },
                  guest: { render: (h) => h("div", ["I'm Guest"]) },
                },
                meta: {
                  middleware: {
                    attach: [subscribersMiddleware],
                  },
                  title: "Страница ребенка борда с пропсами",
                },
              },
            ],
          },
        ],
      },
      {
        path: "/license",
        name: "license",
        meta: {
          title: "Лицензия",
        },
        component: {
          render: (h) => h("div", ["License Page"]),
        },
      },
    ],
  },
  {
    path: "/auth-required",
    name: "auth-required",
    component: { render: (h) => h("div", ["Auth required!"]) },
    meta: {
      title: "Необходима авторизоваться",
      middleware: {
        ignore: [authMiddleware],
      },
    },
  },
  {
    path: "/*",
    component: { render: (h) => h("div", ["404! Page Not Found!"]) },
    meta: {
      title: "Страница не найдена!",
      middleware: {
        ignore: [authMiddleware],
      },
    },
  },
];

export default routes;
