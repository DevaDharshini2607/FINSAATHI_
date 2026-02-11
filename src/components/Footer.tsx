import logo from '../assets/logo_v2.jpg';
import { Github, Twitter, Linkedin, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer id="contact" className="bg-brand-dark text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <img
                                src={logo}
                                alt="FinSaathi Logo"
                                className="h-16 w-auto object-contain"
                            />
                        </div>
                        <p className="text-gray-100 text-sm leading-relaxed">
                            Empowering Financial Awareness & Digital Inclusion for everyone. Your trusted partner in the digital economy.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.platform')}</h3>
                        <ul className="space-y-2 text-gray-200 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">{t('navbar.home')}</a></li>
                            <li><a href="#features" className="hover:text-white transition-colors">{t('navbar.features')}</a></li>
                            <li><a href="#tutorials" className="hover:text-white transition-colors">{t('navbar.tutorials')}</a></li>
                            <li><a href="#calculators" className="hover:text-white transition-colors">{t('navbar.calculators')}</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.resources')}</h3>
                        <ul className="space-y-2 text-gray-200 text-sm">
                            <li><a href="#faq" className="hover:text-white transition-colors">{t('navbar.faq')}</a></li>
                            <li><a href="#scam" className="hover:text-white transition-colors">Report Fraud</a></li>
                            <li><a href="#schemes" className="hover:text-white transition-colors">Gov Schemes</a></li>
                            <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.contact')}</h3>
                        <ul className="space-y-2 text-gray-200 text-sm">
                            <li className="flex items-center space-x-2">
                                <Mail className="w-4 h-4" />
                                <span>support@finbridge.org </span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone className="w-4 h-4" />
                                <span>Toll Free: xxxx-xxx-xxxx</span>
                            </li>
                        </ul>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="text-gray-200 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-200 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-200 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
                    <p>© 2024 FinSaathi. {t('footer.rights')}</p>
                    <p className="mt-2 md:mt-0">Made with ❤️ for Hackathon</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
