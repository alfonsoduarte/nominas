angular
.module("verificaciones")
.controller("asignaFoliosDetalleCtrl", asignaFoliosDetalleCtrl);
function asignaFoliosDetalleCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr) {

	let rc = $reactive(this).attach($scope);

  this.action = true;
	this.subscribe('folios',()=>{
			return [{_id: $stateParams.id}]
	});
	
	this.subscribe('usuarios',()=>{
		return [{"profile.estatus": true, roles: ["Verificador"]}]
	});

  this.helpers({
	  folio : () => {
		  return Folios.findOne();
	  },
	   usuarios: ()=> {
		  return Meteor.users.find({roles : ["Verificador"]});
	  }
  });
  	
	this.actualizar = function(folio,form)
	{
			if(form.$invalid){
		        toastr.error('Error al guardar los datos.');
		        return;
		  }
			console.log(folio);
			
			
			
			var idTemp = folio._id;
			delete folio._id;		
			folio.usuarioActualizo = Meteor.userId(); 
			folio.estatus = "Asignado";
			Folios.update({_id:idTemp},{$set:folio});
			toastr.success('Actualizado correctamente.');
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
	    $state.go('root.asignafolios');
			
	};
	
};