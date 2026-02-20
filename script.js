/* ============================================
   Fun Offroad Coban Talun - Main JavaScript
   Author: haidar
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ============ Navbar Scroll Effect ============
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ============ Scroll to Top Button ============
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============ Auto Generate TOC ============
    const tocBody = document.querySelector('.toc-body ul');
    const articleContent = document.querySelector('.article-text');

    if (tocBody && articleContent) {
        const headings = articleContent.querySelectorAll('h2, h3');
        tocBody.innerHTML = '';

        headings.forEach(function(heading, index) {
            const id = 'section-' + index;
            heading.setAttribute('id', id);

            const li = document.createElement('li');
            if (heading.tagName === 'H3') {
                li.classList.add('toc-h3');
            }

            const a = document.createElement('a');
            a.href = '#' + id;
            a.textContent = heading.textContent;
            a.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.getElementById(id);
                if (target) {
                    const offset = navbar ? navbar.offsetHeight + 20 : 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            });

            li.appendChild(a);
            tocBody.appendChild(li);
        });
    }

    // ============ TOC Toggle ============
    const tocHeader = document.querySelector('.toc-header');
    const tocBodyEl = document.querySelector('.toc-body');
    const tocToggle = document.querySelector('.toc-toggle');

    if (tocHeader && tocBodyEl && tocToggle) {
        tocHeader.addEventListener('click', function() {
            tocBodyEl.classList.toggle('collapsed');
            tocToggle.classList.toggle('collapsed');
        });
    }

    // ============ FAQ Accordion ============
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            // Close all
            faqQuestions.forEach(function(q) {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('show');
            });

            // Open clicked if not currently active
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('show');
            }
        });
    });

    // ============ Share Buttons ============
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform');
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            const text = encodeURIComponent(document.querySelector('meta[name="description"]')?.content || document.title);
            let shareUrl = '';

            switch(platform) {
                case 'whatsapp':
                    shareUrl = 'https://api.whatsapp.com/send?text=' + title + '%20' + url;
                    break;
                case 'facebook':
                    shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
                    break;
                case 'twitter':
                    shareUrl = 'https://twitter.com/intent/tweet?text=' + title + '&url=' + url;
                    break;
                case 'linkedin':
                    shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + url;
                    break;
                case 'telegram':
                    shareUrl = 'https://t.me/share/url?url=' + url + '&text=' + title;
                    break;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });

    // ============ Smooth Scroll for Anchor Links ============
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = navbar ? navbar.offsetHeight + 20 : 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ============ Animate on Scroll (Simple) ============
    const animateElements = document.querySelectorAll('[data-animate]');
    if (animateElements.length > 0) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animateElements.forEach(function(el) {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    // ============ Navbar Active Link ============
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar .nav-link');
    navLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
        // Blog detail pages
        if (currentPage !== 'index.html' && currentPage !== 'blog.html' && currentPage !== '' && href === 'blog.html') {
            link.classList.add('active');
        }
    });

    // ============ Close navbar on link click (mobile) ============
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinksAll = document.querySelectorAll('.navbar-nav .nav-link');
    navLinksAll.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
});
