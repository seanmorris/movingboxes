<?php
namespace SeanMorris\MovingBoxes\Route;
class RootRoute extends \SeanMorris\PressKit\Controller
{
	public
		$title = 'Moving Boxes',
		$theme = 'SeanMorris\MovingBoxes\Theme\Theme'
	;
		
	public function index($router)
	{
		return new \SeanMorris\MovingBoxes\View\Main;
	}
}
