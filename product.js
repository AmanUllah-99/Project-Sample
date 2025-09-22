
    document.addEventListener('DOMContentLoaded', function() {
      const sidebar = document.getElementById('sidebar');
      const productLinks = document.querySelectorAll('.list-group-item');
      const productContainer = document.getElementById('productContainer');
      const productTitle = document.getElementById('productTitle');
      const productCards = document.getElementById('productCards');
      const mainContent = document.getElementById('mainContent');
      const defaultContent = document.getElementById('defaultContent');
      const productsLink = document.getElementById('productsLink');
      
      // Sample product data
      const products = {
        almonds: [
          { name: "California Almonds", price: "$12.99", image: "https://images.unsplash.com/photo-1597004719510-32b8f2e1a2d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWxtb25kc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
          { name: "Organic Almonds", price: "$15.99", image: "https://images.unsplash.com/photo-1623426293292-836d76e2f6a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWxtb25kc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
          { name: "Blanched Almonds", price: "$13.50", image: "https://images.unsplash.com/photo-1615485500675-4e56cc34e1a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFsbW9uZHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
          { name: "Almond Pack", price: "$18.75", image: "https://images.unsplash.com/photo-1597004894500-4615c3b58c33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFsbW9uZHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" }
        ],
        cashews: [
          { name: "Whole Cashews", price: "$14.99", image: "https://images.unsplash.com/photo-1603064752733-594d3d5e6a90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzaGV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
          { name: "Roasted Cashews", price: "$16.50", image: "https://images.unsplash.com/photo-1603064752733-594d3d5e6a90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzaGV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
          { name: "Salted Cashews", price: "$15.25", image: "https://images.unsplash.com/photo-1603064752733-594d3d5e6a90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzaGV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
          { name: "Cashew Bundle", price: "$20.00", image: "https://images.unsplash.com/photo-1603064752733-594d3d5e6a90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzaGV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" }
        ],
        walnuts: [
          { name: "English Walnuts", price: "$11.99", image: "https://images.unsplash.com/photo-1593684390156-edb4ea50fb32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbnV0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
          { name: "Organic Walnuts", price: "$13.75", image: "https://images.unsplash.com/photo-1593684390156-edb4ea50fb32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbnV0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
          { name: "Walnut Halves", price: "$14.25", image: "https://images.unsplash.com/photo-1593684390156-edb4ea50fb32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbnV0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
          { name: "Walnut Mix", price: "$16.99", image: "https://images.unsplash.com/photo-1593684390156-edb4ea50fb32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbnV0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" }
        ],
        pistachios: [
          { name: "Shelled Pistachios", price: "$17.99", image: "https://images.unsplash.com/photo-1597004894500-4615c3b58c33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGlzdGFjaGlvc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
          { name: "Roasted Pistachios", price: "$16.75", image: "https://images.unsplash.com/photo-1597004894500-4615c3b58c33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGlzdGFjaGlvc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
          { name: "Salted Pistachios", price: "$15.50", image: "https://images.unsplash.com/photo-1597004894500-4615c3b58c33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGlzdGFjaGlvc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
          { name: "Pistachio Box", price: "$21.25", image: "https://images.unsplash.com/photo-1597004894500-4615c3b58c33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGlzdGFjaGlvc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" }
        ],
        raisins: [
          { name: "Black Raisins", price: "$8.99", image: "https://images.unsplash.com/photo-1593684390156-edb4ea50fb32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFpc2luc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
          { name: "Golden Raisins", price: "$9.50", image: "https://images.unsplash.com/photo-1593684390156-edb4ea50fb32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFpc2luc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
          { name: "Seedless Raisins", price: "$10.25", image: "https://images.unsplash.com/photo-1593684390156-edb4ea50fb32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFpc2luc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
          { name: "Raisin Pack", price: "$12.99", image: "https://images.unsplash.com/photo-1593684390156-edb4ea50fb32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFpc2luc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" }
        ],
        mixed: [
          { name: "Premium Mix", price: "$22.99", image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRyeSUyMGZydWl0JTIwbWl4fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" },
          { name: "Energy Blend", price: "$19.75", image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRyeSUyMGZydWl0JTIwbWl4fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" },
          { name: "Festival Pack", price: "$24.50", image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRyeSUyMGZydWl0JTIwbWl4fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" },
          { name: "Family Box", price: "$27.99", image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRyeSUyMGZydWl0JTIwbWl4fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" }
        ]
      };

      // Toggle sidebar when Products link is clicked
      productsLink.addEventListener('click', function(e) {
        e.preventDefault();
        toggleSidebar();
      });

      // Handle product selection
      productLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const productType = this.getAttribute('data-product');
          showProducts(productType);
          
          // Highlight selected product
          productLinks.forEach(item => item.classList.remove('active'));
          this.classList.add('active');
        });
      });

      // Function to toggle sidebar
      function toggleSidebar() {
        if (window.innerWidth >= 992) {
          // For desktop - toggle sidebar and adjust content
          sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
          mainContent.classList.toggle('with-sidebar');
        } else {
          // For mobile - show sidebar as overlay
          sidebar.classList.toggle('mobile-visible');
        }
      }

      // Function to display products
      function showProducts(type) {
        // Update title
        productTitle.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        
        // Clear previous cards
        productCards.innerHTML = '';
        
        // Create new cards
        products[type].forEach(product => {
          const col = document.createElement('div');
          col.className = 'col-md-3 col-sm-6 mb-4';
          col.innerHTML = `
            <div class="card product-card h-100">
              <img src="${product.image}" class="card-img-top" alt="${product.name}">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.name}</h5>
                <p class="price mt-auto">${product.price}</p>
                <button class="btn btn-add-to-cart">Add to Cart</button>
              </div>
            </div>
          `;
          productCards.appendChild(col);
        });
        
        // Show product container and hide default content
        productContainer.style.display = 'block';
        defaultContent.style.display = 'none';
        
        // Ensure sidebar is visible on desktop
        if (window.innerWidth >= 992 && !sidebar.style.display) {
          sidebar.style.display = 'block';
          mainContent.classList.add('with-sidebar');
        }
      }

      // Handle window resize
      window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
          // On desktop, ensure proper sidebar behavior
          sidebar.classList.remove('mobile-visible');
          if (productContainer.style.display === 'block') {
            sidebar.style.display = 'block';
            mainContent.classList.add('with-sidebar');
          }
        } else {
          // On mobile, reset desktop styles
          sidebar.style.display = 'none';
          mainContent.classList.remove('with-sidebar');
        }
      });
    });
  