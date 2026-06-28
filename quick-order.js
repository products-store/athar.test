document.addEventListener('DOMContentLoaded', () => {
    // Discord Webhook URL
    const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1481703762274947106/Bda8WkM_WQyKA9_RbJBwjDoqBrl-fxxB4zYyJqApA5c1NLVQv6jc3q8yCuIqZc-afe_Y';

    // Google Sheets Web App URL - استبدل هذا برابط الـ Web App الخاص بك
    const GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzqgWvG970Dx_OvdmBWxYML_zglpZQfQ1Q3ySQG1zWwnCpRkaxf0KprjJDWK05PlIyM/exec';

    // Data for Algerian Wilayas
    const wilayaPrices = [
        { name: 'أدرار', home: 1450, office: 1070, cancel: 200 },
        { name: 'الشلف', home: 850, office: 570, cancel: 200 },
        { name: 'الأغواط', home: 950, office: 670, cancel: 200 },
        { name: 'أم البواقي', home: 800, office: 570, cancel: 200 },
        { name: 'باتنة', home: 900, office: 570, cancel: 200 },
        { name: 'بجاية', home: 900, office: 570, cancel: 200 },
        { name: 'بسكرة', home: 950, office: 670, cancel: 200 },
        { name: 'بشار', home: 1200, office: 770, cancel: 200 },
        { name: 'البليدة', home: 700, office: 520, cancel: 200 },
        { name: 'البويرة', home: 750, office: 570, cancel: 200 },
        { name: 'تمنراست', home: 1650, office: 1270, cancel: 250 },
        { name: 'تبسة', home: 950, office: 570, cancel: 200 },
        { name: 'تلمسان', home: 900, office: 570, cancel: 200 },
        { name: 'تيارت', home: 850, office: 520, cancel: 200 },
        { name: 'تيزي وزو', home: 750, office: 570, cancel: 200 },
        { name: 'الجزائر', home: 600, office: 520, cancel: 200 },
        { name: 'الجلفة', home: 950, office: 670, cancel: 200 },
        { name: 'جيجل', home: 900, office: 570, cancel: 200 },
        { name: 'سطيف', home: 850, office: 570, cancel: 200 },
        { name: 'سعيدة', home: 900, office: 620, cancel: 200 },
        { name: 'سكيكدة', home: 900, office: 570, cancel: 200 },
        { name: 'سيدي بلعباس', home: 900, office: 570, cancel: 200 },
        { name: 'عنابة', home: 900, office: 570, cancel: 200 },
        { name: 'قالمة', home: 850, office: 570, cancel: 200 },
        { name: 'قسنطينة', home: 850, office: 570, cancel: 200 },
        { name: 'المدية', home: 850, office: 570, cancel: 200 },
        { name: 'مستغانم', home: 900, office: 570, cancel: 200 },
        { name: 'المسيلة', home: 900, office: 570, cancel: 200 },
        { name: 'معسكر', home: 900, office: 570, cancel: 200 },
        { name: 'ورقلة', home: 1000, office: 670, cancel: 200 },
        { name: 'وهران', home: 850, office: 570, cancel: 200 },
        { name: 'البيض', home: 1100, office: 670, cancel: 250 },
        { name: 'برج بوعريريج', home: 850, office: 570, cancel: 200 },
        { name: 'بومرداس', home: 500, office: 420, cancel: 200 },
        { name: 'الطارف', home: 900, office: 570, cancel: 200 },
        { name: 'تيسمسيلت', home: 900, office: 520, cancel: 200 },
        { name: 'الوادي', home: 1000, office: 670, cancel: 200 },
        { name: 'خنشلة', home: 900, office: null, cancel: 200 },
        { name: 'سوق أهراس', home: 900, office: 570, cancel: 200 },
        { name: 'تيبازة', home: 800, office: 570, cancel: 200 },
        { name: 'ميلة', home: 900, office: 570, cancel: 200 },
        { name: 'عين الدفلى', home: 900, office: 570, cancel: 200 },
        { name: 'النعامة', home: 1200, office: 670, cancel: 200 },
        { name: 'عين تموشنت', home: 900, office: 570, cancel: 200 },
        { name: 'غرداية', home: 950, office: 670, cancel: 200 },
        { name: 'غليزان', home: 900, office: 570, cancel: 200 },
        { name: 'تيميمون', home: 1450, office: 1070, cancel: 250 },
        { name: 'أولاد جلال', home: 950, office: 670, cancel: 200 },
        { name: 'بني عباس', home: 1100, office: 1070, cancel: 250 },
        { name: 'عين صالح', home: 1650, office: null, cancel: 250 },
        { name: 'عين قزام', home: 1650, office: null, cancel: 250 },
        { name: 'تقرت', home: 950, office: 670, cancel: 250 },
        { name: 'المغير', home: 950, office: null, cancel: 200 },
        { name: 'المنيعة', home: 1100, office: null, cancel: 200 }
    ];

    // --- DOM Elements ---
    const quickOrderForm = document.getElementById('quick-order-form');
    const quickFullNameInput = document.getElementById('quick-fullName');
    const quickPhoneInput = document.getElementById('quick-phone');
    const quickAlternativePhoneInput = document.getElementById('quick-alternativePhone');
    const quickWilayaSelect = document.getElementById('quick-wilaya');
    const quickDeliveryMethodRadios = document.querySelectorAll('#quick-order-form input[name="deliveryMethod"]');
    const quickDeliveryToOfficeRadio = document.getElementById('quick-deliveryToOffice');
    const quickDeliveryToHomeRadio = document.getElementById('quick-deliveryToHome');
    const quickCommuneGroup = document.getElementById('quick-commune-group');
    const quickCommuneInput = document.getElementById('quick-commune');
    const quickProductsSubtotalElement = document.getElementById('quick-products-subtotal');
    const quickDeliveryPriceElement = document.getElementById('quick-delivery-price');
    const quickOrderGrandTotalElement = document.getElementById('quick-order-grand-total');
    const quantityInput = document.querySelector('.quantity-input');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');

    // --- State Variables ---
    let productsTotalPrice = 0;
    let currentDeliveryPrice = 0;
    let selectedWilayaData = null;
    let selectedDeliveryMethod = 'office';
    const productPrice = 2900;

    // --- Functions ---

    const populateWilayas = () => {
        wilayaPrices.forEach(wilaya => {
            const option = document.createElement('option');
            option.value = wilaya.name;
            option.textContent = wilaya.name;
            quickWilayaSelect.appendChild(option);
        });
    };

    const calculateProductsSubtotal = () => {
        const quantity = parseInt(quantityInput.value) || 1;
        productsTotalPrice = productPrice * quantity;
        quickProductsSubtotalElement.textContent = `${productsTotalPrice.toLocaleString('ar-DZ')} د.ج`;
        return productsTotalPrice;
    };

    const updateOrderTotals = () => {
        let currentTotal = calculateProductsSubtotal();
        currentDeliveryPrice = 0;

        if (selectedWilayaData) {
            if (selectedDeliveryMethod === 'office' && selectedWilayaData.office === null) {
                alert(`التوصيل للمكتب غير متاح في ولاية ${selectedWilayaData.name}. سيتم تحويلك إلى التوصيل للمنزل.`);
                quickDeliveryToHomeRadio.checked = true;
                selectedDeliveryMethod = 'home';
            }

            if (selectedDeliveryMethod === 'home') {
                currentDeliveryPrice = selectedWilayaData.home;
                quickCommuneGroup.style.display = 'block';
                quickCommuneInput.setAttribute('required', 'true');
            } else {
                currentDeliveryPrice = selectedWilayaData.office;
                quickCommuneGroup.style.display = 'none';
                quickCommuneInput.removeAttribute('required');
                quickCommuneInput.value = '';
            }
        } else {
            quickCommuneGroup.style.display = 'none';
            quickCommuneInput.removeAttribute('required');
            quickCommuneInput.value = '';
        }

        currentTotal += currentDeliveryPrice;
        quickDeliveryPriceElement.textContent = `${currentDeliveryPrice.toLocaleString('ar-DZ')} د.ج`;
        quickOrderGrandTotalElement.textContent = `${currentTotal.toLocaleString('ar-DZ')} د.ج`;
    };

    const handleQuantityChange = () => {
        updateOrderTotals();
    };

    // --- وظيفة إرسال البيانات إلى Google Sheets ---
    const sendToGoogleSheets = async (order) => {
        const sheetData = {
            orderId: order.id,
            date: order.date,
            fullName: order.shippingInfo.fullName,
            phone: order.shippingInfo.phone,
            alternativePhone: order.shippingInfo.alternativePhone || 'لا يوجد',
            wilaya: order.shippingInfo.wilaya,
            deliveryMethod: order.shippingInfo.deliveryMethod === 'home' ? 'توصيل للمنزل' : 'توصيل للمكتب',
            commune: order.shippingInfo.commune || 'غير قابل للتطبيق',
            productName: order.items.map(item => item.name).join(', '),
            color: order.items.map(item => item.color).join(', '),
            size: order.items.map(item => item.size).join(', '),
            quantity: order.items.reduce((sum, item) => sum + item.quantity, 0),
            unitPrice: order.items.length > 0 ? order.items[0].price : 0,
            productsTotal: order.productsTotal,
            deliveryCost: order.deliveryCost,
            totalAmount: order.totalAmount,
            status: order.status,
            itemsList: order.items.map(item => 
                `${item.name} (${item.color}، ${item.size}) × ${item.quantity} = ${(item.price * item.quantity).toLocaleString('ar-DZ')} د.ج`
            ).join(' | ')
        };

        try {
            const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sheetData),
            });

            if (!response.ok) {
                console.error('Google Sheets Error:', response.status, response.statusText);
                return false;
            }

            const result = await response.json();
            if (result && result.success === true) {
                console.log('Order saved to Google Sheets successfully!');
                return true;
            } else {
                console.error('Google Sheets Error:', result);
                return false;
            }
        } catch (error) {
            console.error('Error sending to Google Sheets:', error);
            return false;
        }
    };

    // Send data to Discord webhook
    const sendToDiscordWebhook = async (order) => {
        const orderItemsList = order.items.map(item => 
            `${item.name} (${item.color}، ${item.size}) × ${item.quantity} = ${(item.price * item.quantity).toLocaleString('ar-DZ')} د.ج`
        ).join('\n');

        const deliveryMethodText = order.shippingInfo.deliveryMethod === 'home' 
            ? `التوصيل إلى المنزل (${order.shippingInfo.commune})`
            : 'التوصيل إلى مكتب البريد';

        const webhookPayload = {
            username: "ATHAR Order Bot",
            embeds: [
                {
                    title: "طلب جديد 📦 (طلب سريع)",
                    color: 0x28A745,
                    fields: [
                        {
                            name: "معلومات العميل",
                            value: `**الاسم:** ${order.shippingInfo.fullName}\n**الهاتف:** ${order.shippingInfo.phone}\n**الهاتف الاحتياطي:** ${order.shippingInfo.alternativePhone}`,
                            inline: false
                        },
                        {
                            name: "معلومات التوصيل",
                            value: `**الولاية:** ${order.shippingInfo.wilaya}\n**${deliveryMethodText}**`,
                            inline: false
                        },
                        {
                            name: "المنتجات",
                            value: orderItemsList || "لا توجد منتجات",
                            inline: false
                        },
                        {
                            name: "الفاتورة",
                            value: `**المجموع الجزئي:** ${order.productsTotal.toLocaleString('ar-DZ')} د.ج\n**تكلفة التوصيل:** ${order.deliveryCost.toLocaleString('ar-DZ')} د.ج\n**المجموع الكلي:** ${order.totalAmount.toLocaleString('ar-DZ')} د.ج`,
                            inline: false
                        }
                    ],
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: "ATHAR Store (Quick Order) - " + new Date().toLocaleString('ar-DZ')
                    }
                }
            ]
        };

        try {
            const response = await fetch(DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(webhookPayload),
            });

            if (!response.ok) {
                console.error('Failed to send webhook:', response.status, response.statusText);
                alert(`حدث خطأ أثناء إرسال الطلب (${response.status}). الرجاء المحاولة مرة أخرى أو الاتصال بالدعم.`);
                return false;
            }
            console.log('Webhook sent successfully!');
            return true;
        } catch (error) {
            console.error('Error sending webhook:', error);
            alert('حدث خطأ في الاتصال. الرجاء التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.');
            return false;
        }
    };

    // --- Event Listeners and Initial Setup ---

    populateWilayas();
    calculateProductsSubtotal();
    
    if (quickDeliveryToHomeRadio.checked) {
        selectedDeliveryMethod = 'home';
    } else {
        selectedDeliveryMethod = 'office';
    }
    updateOrderTotals();

    quickWilayaSelect.addEventListener('change', () => {
        const selectedWilayaName = quickWilayaSelect.value;
        selectedWilayaData = wilayaPrices.find(w => w.name === selectedWilayaName);
        updateOrderTotals();
    });

    quickDeliveryMethodRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            selectedDeliveryMethod = event.target.value;
            updateOrderTotals();
        });
    });

    quantityInput.addEventListener('change', handleQuantityChange);
    quantityInput.addEventListener('input', handleQuantityChange);
    minusBtn.addEventListener('click', handleQuantityChange);
    plusBtn.addEventListener('click', handleQuantityChange);

    // Form submission
    quickOrderForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Basic validation
        if (!quickFullNameInput.value.trim()) {
            alert('الرجاء إدخال الاسم الكامل.');
            return;
        }
        if (!quickPhoneInput.value.trim()) {
            alert('الرجاء إدخال رقم الهاتف الأساسي.');
            return;
        }
        if (quickPhoneInput.value.trim().length < 9 || !/^\d+$/.test(quickPhoneInput.value.trim())) {
             alert('رقم الهاتف الأساسي غير صحيح. الرجاء إدخال 9 أرقام على الأقل.');
             return;
        }
        if (quickAlternativePhoneInput.value.trim() && (quickAlternativePhoneInput.value.trim().length < 9 || !/^\d+$/.test(quickAlternativePhoneInput.value.trim()))) {
            alert('رقم الهاتف الاحتياطي غير صحيح. الرجاء إدخال 9 أرقام على الأقل أو تركه فارغًا.');
            return;
        }

        if (!quickWilayaSelect.value) {
            alert('الرجاء اختيار الولاية.');
            return;
        }

        if (selectedDeliveryMethod === 'home' && !quickCommuneInput.value.trim()) {
            alert('الرجاء إدخال اسم البلدية للتوصيل إلى المنزل.');
            return;
        }

        if (!selectedWilayaData) {
            alert('الرجاء اختيار ولاية صالحة قبل تأكيد الطلب.');
            return;
        }

        const selectedColorBtn = document.querySelector('.color-btn.active');
        const selectedSizeBtn = document.querySelector('.size-btn.active');
        const selectedColor = selectedColorBtn ? selectedColorBtn.dataset.color : 'black';
        const selectedSize = selectedSizeBtn ? selectedSizeBtn.dataset.size : '52';
        const quantity = parseInt(quantityInput.value) || 1;
        const userFriendlyColor = productDetails.colors[selectedColor].name;

        const shippingInfo = {
            fullName: quickFullNameInput.value.trim(),
            phone: quickPhoneInput.value.trim(),
            alternativePhone: quickAlternativePhoneInput.value.trim() || 'لا يوجد',
            wilaya: quickWilayaSelect.value,
            deliveryMethod: selectedDeliveryMethod,
            commune: selectedDeliveryMethod === 'home' ? quickCommuneInput.value.trim() : 'غير قابل للتطبيق',
            paymentMethod: "cashOnDelivery"
        };

        const orderItem = {
            id: `${selectedColor}-${selectedSize}`,
            name: productDetails.name,
            color: userFriendlyColor,
            size: selectedSize,
            price: productPrice,
            quantity: quantity,
            image: productDetails.colors[selectedColor].main
        };

        const order = {
            id: 'ORD-' + Date.now(),
            date: new Date().toLocaleString('ar-DZ', { timeZone: 'Africa/Algiers' }),
            shippingInfo: shippingInfo,
            items: [orderItem],
            productsTotal: productsTotalPrice,
            deliveryCost: currentDeliveryPrice,
            totalAmount: productsTotalPrice + currentDeliveryPrice,
            status: 'Pending'
        };

        // ✅ إرسال إلى Discord أولاً
        const webhookSent = await sendToDiscordWebhook(order);

        if (webhookSent) {
            // ✅ ثم إرسال إلى Google Sheets
            const sheetsSent = await sendToGoogleSheets(order);
            
            if (sheetsSent) {
                console.log('✅ Quick order saved to both Discord and Google Sheets');
            } else {
                console.warn('⚠️ Quick order saved to Discord but failed to save to Google Sheets');
            }

            let allOrders = JSON.parse(localStorage.getItem('qudwahOrders')) || [];
            allOrders.push(order);
            localStorage.setItem('qudwahOrders', JSON.stringify(allOrders));

            const cartCountElement = document.querySelector('.cart-count');
            if (cartCountElement) {
                cartCountElement.textContent = quantity;
            }

            fbq('track', 'Purchase', {
                value: order.totalAmount,
                currency: 'DZD',
                contents: order.items.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    item_price: item.price
                }))
            });

            if (confirm('✅ لقد تم استلام طلبك، سنتصل بك للتأكيد. اضغط موافق للعودة للصفحة الرئيسية.')) {
                window.location.href = 'index.html';
            }
        }
    });

    // تحميل المعلومات المحفوظة
    const savedInfo = JSON.parse(localStorage.getItem('qudwahShippingInfo'));
    if (savedInfo) {
        quickFullNameInput.value = savedInfo.fullName || '';
        quickPhoneInput.value = savedInfo.phone || '';
        quickAlternativePhoneInput.value = savedInfo.alternativePhone || '';
        
        if (savedInfo.wilaya) {
            quickWilayaSelect.value = savedInfo.wilaya;
            selectedWilayaData = wilayaPrices.find(w => w.name === savedInfo.wilaya);
        }

        if (savedInfo.deliveryMethod === 'home') {
            quickDeliveryToHomeRadio.checked = true;
            selectedDeliveryMethod = 'home';
            quickCommuneInput.value = savedInfo.commune || '';
        } else {
            quickDeliveryToOfficeRadio.checked = true;
            selectedDeliveryMethod = 'office';
        }
        updateOrderTotals();
    } else {
        calculateProductsSubtotal();
        updateOrderTotals();
    }

    // حفظ المعلومات عند الإدخال
    const saveInfoOnInput = () => {
        const currentInfo = {
            fullName: quickFullNameInput.value.trim(),
            phone: quickPhoneInput.value.trim(),
            alternativePhone: quickAlternativePhoneInput.value.trim(),
            wilaya: quickWilayaSelect.value,
            deliveryMethod: selectedDeliveryMethod,
            commune: quickCommuneInput.value.trim()
        };
        localStorage.setItem('qudwahShippingInfo', JSON.stringify(currentInfo));
    };

    quickFullNameInput.addEventListener('input', saveInfoOnInput);
    quickPhoneInput.addEventListener('input', saveInfoOnInput);
    quickAlternativePhoneInput.addEventListener('input', saveInfoOnInput);
    quickWilayaSelect.addEventListener('change', saveInfoOnInput);
    quickDeliveryMethodRadios.forEach(radio => radio.addEventListener('change', () => {
        selectedDeliveryMethod = radio.value;
        saveInfoOnInput();
    }));
    quickCommuneInput.addEventListener('input', saveInfoOnInput);
});
