import React from 'react'
import{ useState, useEffect } from 'react';

const Footer = () => {

    const [currentYear, setCurrentYear] = useState();

    useEffect(() => {
      setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <>
            <footer class="bg-primary text-white py-12">
                <div class="container mx-auto px-6">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div class="flex items-center mb-6">
                                <div class="w-12 h-12 bg-white rounded-full mr-3 flex items-center justify-center">
                                    <div class="font-bold text-primary text-xl">UDOM</div>
                                </div>
                                <div class="text-xl font-bold">University of Dodoma</div>
                            </div>
                            <p class="text-gray-300">Enhancing Mathematics and Science Education in Secondary Schools in Tanzania - A partnership program with MoEST sponsored by UNICEF.</p>
                        </div>

                        <div>
                            <h3 class="text-xl font-semibold mb-6">Quick Links</h3>
                            <ul class="space-y-3">
                                <li><a href="#home" class="text-gray-300 hover:text-secondary transition-colors">Home</a></li>
                                <li><a href="#about" class="text-gray-300 hover:text-secondary transition-colors">About</a></li>
                                <li><a href="#objectives" class="text-gray-300 hover:text-secondary transition-colors">Objectives</a></li>
                                <li><a href="#activities" class="text-gray-300 hover:text-secondary transition-colors">Activities</a></li>
                                <li><a href="#team" class="text-gray-300 hover:text-secondary transition-colors">Team</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 class="text-xl font-semibold mb-6">Resources</h3>
                            <ul class="space-y-3">
                                <li><a href="#" class="text-gray-300 hover:text-secondary transition-colors">Publications</a></li>
                                <li><a href="#" class="text-gray-300 hover:text-secondary transition-colors">Research</a></li>
                                <li><a href="#" class="text-gray-300 hover:text-secondary transition-colors">Media</a></li>
                                <li><a href="#" class="text-gray-300 hover:text-secondary transition-colors">Partners</a></li>
                                <li><a href="#" class="text-gray-300 hover:text-secondary transition-colors">Events</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 class="text-xl font-semibold mb-6">Newsletter</h3>
                            <p class="text-gray-300 mb-4">Subscribe to our newsletter for updates on our program activities.</p>
                            <form>
                                <div class="flex">
                                    <input type="email" placeholder="Your email" class="px-4 py-2 w-full rounded-l-lg border border-gray-400 bg-white text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                                    <button type="submit" class="bg-secondary px-4 py-2 rounded-r-lg hover:bg-yellow-600 transition-colors border-l border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200">
                                        <i class="fas fa-paper-plane"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p class="text-gray-300">© {currentYear} The University of Dodoma. All rights reserved.</p>
                        <div class="mt-4 md:mt-0">
                            <a href="#" class="text-gray-300 hover:text-secondary transition-colors mx-2">Privacy Policy</a>
                            <a href="#" class="text-gray-300 hover:text-secondary transition-colors mx-2">Terms of Service</a>
                            <a href="#" class="text-gray-300 hover:text-secondary transition-colors mx-2">Sitemap</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer