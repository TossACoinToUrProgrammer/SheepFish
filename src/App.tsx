import React from 'react';
import { Route, Routes } from 'react-router-dom';
import cn from 'classnames';

import ProductsPage from 'pages/products';
import EditPage from 'pages/edit';
import Message from 'components/message';
import AddProductPage from 'pages/add';
import { useTypedSelector } from 'hooks/useTypedSelector';

function App() {
  const { isLoading } = useTypedSelector(state => state.products)

  return (
    <div className={cn({ "loading": isLoading })}>
      <Routes>
        <Route path='edit/:productId' element={<EditPage />} />
        <Route path='add-product' element={<AddProductPage />} />
        <Route path='/' element={<ProductsPage />} />
      </Routes>
      <Message />
    </div>
  );
}

export default App;
