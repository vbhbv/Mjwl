/**
 * [theme-switcher.js]
 * يدير التبديل بين وضع الليل والنهار ويحفظ تفضيل المستخدم.
 */

// 1. تحديد العناصر في DOM
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const STORAGE_KEY = 'user-theme';
const DARK_MODE_CLASS = 'dark-mode';

// 2. وظيفة لتطبيق الوضع المختار على العنصر <body>
const applyTheme = (theme) => {
    // إزالة أي فئة سابقة وضمان تطبيق الفئة الصحيحة
    body.classList.remove('light-mode', DARK_MODE_CLASS);
    body.classList.add(theme);

    // تحديث نص الزر ليعكس الوضع المقابل للوضع الحالي
    if (theme === DARK_MODE_CLASS) {
        themeToggle.textContent = 'وضع النهار';
    } else {
        themeToggle.textContent = 'وضع الليل';
    }
};

// 3. وظيفة لتحديد الوضع الأولي عند تحميل الصفحة
const initializeTheme = () => {
    // أولاً: التحقق من التفضيل المخزّن محلياً
    let currentTheme = localStorage.getItem(STORAGE_KEY);

    if (currentTheme) {
        // إذا وجد تفضيل محفوظ، نطبقه
        applyTheme(currentTheme);
    } else {
        // ثانياً: إذا لم يجد تفضيل، يتحقق من تفضيل نظام التشغيل (عالمي)
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // تطبيق التفضيل
        const initialTheme = prefersDark ? DARK_MODE_CLASS : 'light-mode';
        applyTheme(initialTheme);
        // حفظ التفضيل الأولي كنقطة انطلاق
        localStorage.setItem(STORAGE_KEY, initialTheme);
    }
};

// 4. وظيفة التبديل بين الأوضاع عند النقر
const toggleTheme = () => {
    const isDark = body.classList.contains(DARK_MODE_CLASS);
    const newTheme = isDark ? 'light-mode' : DARK_MODE_CLASS;

    applyTheme(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
};

// 5. نقطة البدء: تشغيل وظيفة التهيئة وإضافة المستمع للزر
document.addEventListener('DOMContentLoaded', () => {
    // التأكد من أن الزر موجود قبل ربط الحدث
    if (themeToggle) {
        initializeTheme();
        themeToggle.addEventListener('click', toggleTheme);
    } else {
        console.warn('العنصر ذو الهوية (ID) "theme-toggle" غير موجود في HTML.');
    }
});
