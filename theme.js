// Theme Management System
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // تطبيق الوضع المحفوظ عند تحميل الصفحة
        this.applyTheme(this.currentTheme);
        
        // إنشاء زر التبديل إذا لم يكن موجوداً
        this.createThemeToggle();
    }

    createThemeToggle() {
        // التحقق من وجود زر التبديل
        if (document.getElementById('theme-toggle')) return;

        const toggleButton = document.createElement('button');
        toggleButton.id = 'theme-toggle';
        toggleButton.className = 'theme-toggle';
        toggleButton.innerHTML = this.getToggleIcon();
        toggleButton.title = this.getToggleTitle();
        
        // إضافة الزر إلى الصفحة
        document.body.appendChild(toggleButton);
        
        // إضافة مستمع الحدث
        toggleButton.addEventListener('click', () => this.toggleTheme());
    }

    getToggleIcon() {
        return this.currentTheme === 'light' ? '🌙' : '☀️';
    }

    getToggleTitle() {
        return this.currentTheme === 'light' ? 'التبديل للوضع المظلم' : 'التبديل للوضع الفاتح';
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.saveTheme();
        this.updateToggleButton();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    }

    saveTheme() {
        localStorage.setItem('theme', this.currentTheme);
    }

    updateToggleButton() {
        const toggleButton = document.getElementById('theme-toggle');
        if (toggleButton) {
            toggleButton.innerHTML = this.getToggleIcon();
            toggleButton.title = this.getToggleTitle();
        }
    }

    // دالة للحصول على الوضع الحالي
    getCurrentTheme() {
        return this.currentTheme;
    }

    // دالة لتطبيق وضع معين
    setTheme(theme) {
        if (theme === 'light' || theme === 'dark') {
            this.currentTheme = theme;
            this.applyTheme(theme);
            this.saveTheme();
            this.updateToggleButton();
        }
    }
}

// تهيئة مدير الوضع عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});

// تصدير الكلاس للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}

