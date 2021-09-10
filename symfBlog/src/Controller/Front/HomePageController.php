<?php

namespace App\Controller\Front;

use App\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomePageController extends AbstractController
{
    /**
     * @Route("/", name="home_page")
     */
    public function index(): Response
    { 
        return $this->render('home_page/index.html.twig', [
            'controller_name' => 'HomePageController',
        ]);
    }


    /**
     * @Route("/detail/{id}", name="blog_detail")
     */
    public function detail(Post $post): Response
    { 
        return $this->render('front/home_page/detail.html.twig', [
            'controller_name' => 'HomePageController',
        ]);
    }

    /**
     * @Route("/about", name="about")
     */
    public function about(): Response
    { 
        return $this->render('front/home_page/about.html.twig', [
            'controller_name' => 'HomePageController',
        ]);
    }
}
