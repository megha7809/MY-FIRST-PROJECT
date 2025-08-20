import React, { useState } from 'react';

function MenuPage() {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: 'Masala Dosa',
      category: 'South Indian',
      price: 100,
      available: true,
      image: '/a13.avif',
      description: 'Crispy crepe filled with spiced potato mixture, served with sambar and chutney',
      preparationTime: 15
    },
    {
      id: 2,
      name: 'Veg Biryani',
      category: 'Main Course',
      price: 120,
      available: true,
      image: '/s1.jpg',
      description: 'Fragrant rice cooked with mixed vegetables and aromatic spices',
      preparationTime: 20
    },
    {
      id: 3,
      name: 'Paneer Butter Masala',
      category: 'Main Course',
      price: 150,
      available: true,
      image: '/a16.avif',
      description: 'Cottage cheese cubes in rich tomato gravy with butter and cream',
      preparationTime: 25
    },
    {
      id: 4,
      name: 'Cold Coffee',
      category: 'Beverages',
      price: 80,
      available: true,
      image: '/a2.avif',
      description: 'Chilled coffee blended with ice cream and chocolate sauce',
      preparationTime: 10
    },
    {
      id: 5,
      name: 'Chole Bhature',
      category: 'North Indian',
      price: 90,
      available: true,
      image: '/cholebhature.jpg',
      description: 'Spiced chickpeas curry served with fluffy fried bread',
      preparationTime: 20
    },
    {
      id: 6,
      name: 'Samosa',
      category: 'Snacks',
      price: 30,
      available: true,
      image: '/samosa.jpg',
      description: 'Crispy pastry filled with spiced potatoes and green peas',
      preparationTime: 5
    },
    {
      id: 7,
      name: 'Veg Spring Roll',
      category: 'Chinese',
      price: 60,
      available: true,
      image: '/springroll.jpg',
      description: 'Crispy rolls filled with vegetables and noodles',
      preparationTime: 15
    },
    {
      id: 8,
      name: 'Idli Sambhar',
      category: 'South Indian',
      price: 70,
      available: true,
      image: '/idlisambhar.jpg',
      description: 'Steamed rice cakes served with lentil soup and chutney',
      preparationTime: 15
    },
    {
      id: 9,
      name: 'Butter Naan',
      category: 'North Indian',
      price: 40,
      available: true,
      image: '/butternaan.jpg',
      description: 'Soft tandoor-baked bread brushed with butter',
      preparationTime: 10
    },
    {
      id: 10,
      name: 'Veg Manchurian',
      category: 'Chinese',
      price: 110,
      available: true,
      image: '/vegmanchurian.jpg',
      description: 'Mixed vegetable dumplings in spicy sauce',
      preparationTime: 20
    },
    {
      id: 11,
      name: 'Masala Tea',
      category: 'Beverages',
      price: 20,
      available: true,
      image: '/masalatea.jpg',
      description: 'Indian spiced tea with milk',
      preparationTime: 5
    },
    {
      id: 12,
      name: 'Vegetable Fried Rice',
      category: 'Chinese',
      price: 90,
      available: true,
      image: '/friedrice.jpg',
      description: 'Wok-fried rice with mixed vegetables and soy sauce',
      preparationTime: 15
    }
  ]);

  const [categories] = useState([
    'All',
    'South Indian',
    'North Indian',
    'Chinese',
    'Main Course',
    'Snacks',
    'Beverages'
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    preparationTime: ''
  });

  const handleAvailabilityToggle = (id) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const id = menuItems.length + 1;
    setMenuItems([...menuItems, { ...newItem, id, available: true }]);
    setShowAddModal(false);
    setNewItem({ name: '', category: '', price: '', description: '', preparationTime: '' });
  };

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="container-fluid px-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Menu Management</h2>
          <p className="text-muted">Manage your food items and categories</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          <i className="fas fa-plus me-2"></i>Add New Item
        </button>
      </div>

      {/* Categories */}
      <div className="category-scroll mb-4">
        <div className="d-flex gap-2">
          {categories.map(category => (
            <button
              key={category}
              className={`btn ${selectedCategory === category ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="row g-4">
        {filteredItems.map(item => (
          <div key={item.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="position-relative">
                <img 
                  src={item.image}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <span className={`badge position-absolute top-0 end-0 m-2 ${
                  item.available ? 'bg-success' : 'bg-danger'
                }`}>
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h5 className="card-title mb-1">{item.name}</h5>
                    <span className="badge bg-light text-dark">{item.category}</span>
                  </div>
                  <h5 className="text-danger mb-0">₹{item.price}</h5>
                </div>
                <p className="card-text text-muted small">{item.description}</p>
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-clock text-muted me-2"></i>
                  <small className="text-muted">{item.preparationTime} mins</small>
                </div>
                <div className="d-flex gap-2">
                  <button
                    className={`btn btn-sm flex-grow-1 ${
                      item.available ? 'btn-outline-danger' : 'btn-success'
                    }`}
                    onClick={() => handleAvailabilityToggle(item.id)}
                  >
                    <i className={`fas fa-${item.available ? 'times' : 'check'} me-1`}></i>
                    {item.available ? 'Mark Unavailable' : 'Mark Available'}
                  </button>
                  <button className="btn btn-sm btn-outline-primary">
                    <i className="fas fa-edit"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Item</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <form onSubmit={handleAddItem}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newItem.name}
                        onChange={e => setNewItem({...newItem, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Category</label>
                      <select
                        className="form-select"
                        value={newItem.category}
                        onChange={e => setNewItem({...newItem, category: e.target.value})}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.filter(c => c !== 'All').map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Price (₹)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={newItem.price}
                        onChange={e => setNewItem({...newItem, price: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Preparation Time (minutes)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={newItem.preparationTime}
                        onChange={e => setNewItem({...newItem, preparationTime: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Image URL</label>
                      <select
                        className="form-select"
                        value={newItem.image}
                        onChange={e => setNewItem({...newItem, image: e.target.value})}
                        required
                      >
                        <option value="">Select Image</option>
                        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                          <option key={num} value={`/a${num}.avif`}>{`Food Image ${num}`}</option>
                        ))}
                      </select>
                      {newItem.image && (
                        <img
                          src={newItem.image}
                          alt="Selected food"
                          className="mt-2 rounded"
                          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                        />
                      )}
                    </div>
                    <div className="col-12">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={newItem.description}
                        onChange={e => setNewItem({...newItem, description: e.target.value})}
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}

      <style jsx>{`
        .category-scroll {
          overflow-x: auto;
          white-space: nowrap;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 5px;
        }
        .category-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .category-scroll::-webkit-scrollbar-thumb {
          background-color: #dc3545;
          border-radius: 3px;
        }
        .card {
          transition: transform 0.2s;
        }
        .card:hover {
          transform: translateY(-5px);
        }
        .modal {
          background-color: rgba(0, 0, 0, 0.5);
        }
        @media (max-width: 768px) {
          .btn-group {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default MenuPage;
