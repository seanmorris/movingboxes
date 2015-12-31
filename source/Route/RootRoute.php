<?php
namespace SeanMorris\MovingBoxes\Route;
class RootRoute implements \SeanMorris\Ids\Routable
{
	public
		$title = 'Moving Boxes'
		
	public function index($router)
	{
		echo new \SeanMorris\MovingBoxes\View\Main;
		die();
	}
}
