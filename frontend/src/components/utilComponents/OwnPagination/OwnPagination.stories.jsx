import OwnPagination from "./OwnPagination";

export default {
    title: 'utilComponents/OwnPagination',
    component: OwnPagination,
    parameters: {
        layout: 'fullscreen',
    },
};



const Template = (args) => <OwnPagination {...args} />;

export const Primary = Template.bind({});




Primary.args = {
    pageSize: 10,
    pageNumber: 1,
    totalPages: 5,
    handlePrevPage: ()=>{},
    handleNextPage: ()=>{},
    handlePageSizeChange: ()=>{},
    error : "some error"
};
