import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator = (StoryComponent) => (
    <BrowserRouter>
        <StoryComponent />
    </BrowserRouter>
);
