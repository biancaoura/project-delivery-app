import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DeliveryAppContext from '../context/DeliveryAppContext';

function Header() {
  const { setUser } = useContext(DeliveryAppContext);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  // Renderiza link para a tela de produtos a venda pro cliente
  function customerOrders() {
    return (
      <Link
        to="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
        className="navbar-button"
      >
        Produtos
      </Link>
    );
  }

  // renderiza as opções(Pedidos do cliente, pedididos do comprador e tela de gerenciamento pro adm)
  function userOptions() {
    return (
      <div>
        { user.role === 'customer'
        && (
          <Link
            to="/customer/orders"
            data-testid="customer_products__element-navbar-link-orders"
            className="navbar-button"
          >
            Meus Pedidos

          </Link>) }

        { user.role === 'seller'
        && (
          <Link
            to="/seller/orders"
            data-testid="customer_products__element-navbar-link-orders"
            className="navbar-button"
          >
            Pedidos

          </Link>) }

        { user.role === 'administrator'
        && (
          <Link
            to="/admin/manage"
            data-testid="customer_products__element-navbar-link-orders"
            className="navbar-button"
          >
            Gerenciar Usuários

          </Link>) }

      </div>
    );
  }

  function getUserName() {
    const { name } = JSON.parse(localStorage.getItem('user'));
    return name;
  }

  // renderiza o nome do usuário
  function userName() {
    return (
      <div
        data-testid="customer_products__element-navbar-user-full-name"
        className="navbar-button"
      >
        {getUserName()}
      </div>
    );
  }

  function logout() {
    setUser({});
    localStorage.clear();
    navigate('/');
  }

  const handleClick = (e) => {
    e.preventDefault();
    console.log('botão de logout foi clicado');
    logout();
  };

  function logoutButton() {
    return (
      <button
        name="logout-button"
        className="navbar-button"
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ handleClick }
      >
        Sair
      </button>
    );
  }

  return (
    <header className="navbar">
      <div className="navbar-button-container">
        { user.role === 'customer' && customerOrders() }
        { userOptions() }
      </div>

      <div className="navbar-button-container">
        { userName() }

        { logoutButton() }
      </div>

    </header>
  );
}

export default Header;
