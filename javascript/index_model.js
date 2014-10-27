var subjects = {
	conversions: {
		name: "Conversions",
		route: "conversions",
		subCats: {
			currency: {
				name: "Currency Conversions",
				calc: {
					allCurrency: {
						name: "All Currency Conversions",
						route: "conversions/allCurrency",
					}
				}
			},
			unit: {
				name: "Unit Conversions",
				calc: {
					length: {
						name: "Length Conversion",
						route: "conversions/length",
						params: {input: ['length'], output: ['length'], units:  [ 'centimeters', 'feet', 'inches', 'kilometer', 'meters', 'mile', 'milimeter', 'yard' ]},
						func: function (hash) {},
					}
				}
			},

		}	
	},
	math: {
		name: "Mathmatics",
		route: "math",
		subCats: {
			algebra: {
				name: "Algebra",
				calc: {
					quadraticEquation: {
						name: "Quadratic Equation",
						route: "math/quadraticEquation",
						params: {input: ['a','b','c'], output: ['x1', 'x2']},
						func: function (hash) { var a = hash.a, b = hash.b, c = hash.c; var sol1 = (( -b + Math.pow(b * b - 4 * a * c  , 1/2)) / 2 * a); var sol2 = (( -b - Math.pow(b * b - 4 * a * c  , 1/2)) / 2 * a); return [sol1,sol2];},
					}
				}
			},
			calculus: {
				name: "Calculus",
				calc: {
					derivative: {
						name: "Derivative",
						route: "math/derivative",
					}
				}
			},
			general: {
				name: "General Math",
				calc: {
					addition: {
						name: 'Addition',
						route: 'math/addition',
						params: {input: ['a','b'], output: ['sum']},
						func: function (hash) {var a = hash.a, b = hash.b; return [a + b];},
					},
					squareRoot: {
						name: 'Square Root',
						route: "math/squareRoot",
						params: {input: ['number'], output: ['square root']},
						func: function (hash) { var num = hash.number; return [Math.pow(num, 1/2)];},
					}
				}
			}
		}	
	},
	physics: {
		name: "Physics",
		route: "physics",
		subCats: {
			classical: {
				name: "Classical Physics",
				calc: {
					force: {
						name: "Force Calculation",
						route: "physics/force",
						params: {input: ['mass', 'acceleration'], output: ['force']},
						func: function (hash) {var m = hash.mass, a = hash.acceleration; return [m*a];},
					},
					rotMomInert: {
						name: "Rotational Moment of Inertia",
						route: "physics/rotMomInert",
					}
				}
			},
			thermodynamics: {
				name: "Thermodynamics",
				calc: {
					thermalCond: {
						name: "Thermal Conductivity",
						route: "physics/thermalCond",
					}
				}
			},
		}	
	},
};