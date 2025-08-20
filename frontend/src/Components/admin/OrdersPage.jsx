import React, { useState } from 'react';

function OrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: '#101',
      customer: 'Rahul Sharma',
      items: [
        { name: 'Veg Burger', qty: 2, price: 100 },
        { name: 'French Fries', qty: 1, price: 80 }
      ],
      total: 280,
      status: 'pending',
      timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
      timeLeft: 900, // 15 minutes in seconds
      paymentMethod: 'UPI'
    },
    {
      id: '#102',
      customer: 'Priya Verma',
      items: [
        { name: 'Cold Coffee', qty: 1, price: 80 },
        { name: 'Sandwich', qty: 1, price: 120 }
      ],
      total: 200,
      status: 'preparing',
      timestamp: new Date(Date.now() - 15 * 60000), // 15 minutes ago
      timeLeft: 300, // 5 minutes in seconds
      paymentMethod: 'Cash'
    },
    {
      id: '#103',
      customer: 'Amit Kumar',
      items: [
        { name: 'Paneer Roll', qty: 3, price: 100 },
        { name: 'Masala Dosa', qty: 1, price: 150 }
      ],
      total: 450,
      status: 'completed',
      timestamp: new Date(Date.now() - 45 * 60000), // 45 minutes ago
      timeLeft: 0,
      paymentMethod: 'Card'
    }
  ]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-warning';
      case 'preparing':
        return 'bg-info';
      case 'completed':
        return 'bg-success';
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
  };

  const formatTimestamp = (date) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.round((date - new Date()) / (1000 * 60)),
      'minute'
    );
  };

  return (
    <div className="container-fluid px-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Order Management</h2>
          <p className="text-muted">Manage and track all orders</p>
        </div>
        <div className="d-flex gap-2">
          <div className="btn-group">
            <button className="btn btn-outline-secondary">
              <i className="fas fa-filter"></i> Filter
            </button>
            <button className="btn btn-outline-secondary">
              <i className="fas fa-sort"></i> Sort
            </button>
          </div>
          <button className="btn btn-primary">
            <i className="fas fa-download me-2"></i>Export
          </button>
        </div>
      </div>

      {/* Order Cards */}
      <div className="row g-4">
        {orders.map(order => (
          <div key={order.id} className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="row align-items-center">
                  {/* Order Info */}
                  <div className="col-md-3">
                    <h5 className="card-title mb-1">Order {order.id}</h5>
                    <p className="text-muted mb-0">{formatTimestamp(order.timestamp)}</p>
                    <p className="mb-0">
                      <i className="fas fa-user me-2"></i>{order.customer}
                    </p>
                  </div>

                  {/* Items */}
                  <div className="col-md-4">
                    <div className="order-items">
                      {order.items.map((item, index) => (
                        <div key={index} className="d-flex justify-content-between mb-1">
                          <span>{item.qty}x {item.name}</span>
                          <span>₹{item.price * item.qty}</span>
                        </div>
                      ))}
                      <div className="border-top pt-2 mt-2">
                        <strong>Total: ₹{order.total}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Status and Timer */}
                  <div className="col-md-3">
                    <div className="d-flex flex-column align-items-center">
                      <span className={`badge ${getStatusBadgeClass(order.status)} mb-2`}>
                        {order.status.toUpperCase()}
                      </span>
                      {order.timeLeft > 0 && (
                        <div className="timer">
                          <i className="fas fa-clock me-2"></i>
                          {formatTime(order.timeLeft)}
                        </div>
                      )}
                      <small className="text-muted">
                        <i className="fas fa-wallet me-1"></i>
                        {order.paymentMethod}
                      </small>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-md-2">
                    <div className="btn-group d-flex">
                      {order.status === 'pending' && (
                        <button 
                          className="btn btn-success btn-sm"
                          onClick={() => handleStatusUpdate(order.id, 'preparing')}
                        >
                          <i className="fas fa-check me-1"></i>Accept
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => handleStatusUpdate(order.id, 'completed')}
                        >
                          <i className="fas fa-check-double me-1"></i>Complete
                        </button>
                      )}
                      {order.status === 'pending' && (
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                        >
                          <i className="fas fa-times me-1"></i>Cancel
                        </button>
                      )}
                      <button className="btn btn-outline-secondary btn-sm">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .order-items {
          font-size: 0.9rem;
        }
        .timer {
          font-size: 1.2rem;
          font-weight: bold;
          color: #dc3545;
        }
        .badge {
          padding: 8px 12px;
          font-weight: 500;
        }
        .btn-group .btn {
          padding: 0.375rem 0.75rem;
        }
        .card {
          transition: transform 0.2s;
        }
        .card:hover {
          transform: translateY(-2px);
        }
        @media (max-width: 768px) {
          .btn-group {
            flex-direction: column;
            gap: 0.5rem;
          }
          .col-md-2, .col-md-3, .col-md-4 {
            margin-top: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

export default OrdersPage;
