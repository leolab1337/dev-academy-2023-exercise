import NotFoundPage from "../../pages/NotFoundPage";

export default {
    title: 'pages/NotFoundPage',
    component: NotFoundPage,
};

const Template = (args) => <NotFoundPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};


