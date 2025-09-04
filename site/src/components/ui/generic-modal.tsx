"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "./button";
import { X } from "lucide-react";

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GenericModal({ isOpen, onClose }: GenericModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    origen: "",
    destino: "",
    fecha: "",
    hora: "",
    detalles: "",
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log("Formulario genérico enviado:", formData);
    onClose();
  };

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-border px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Solicita tu servicio</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-sm text-muted-foreground mb-6">
            Este formulario se enviará al equipo de LogroVTC. Nos pondremos en contacto contigo lo antes posible para confirmar los detalles de tu traslado.
          </p>
          
          <div className="grid md:grid-cols-2 gap-3">
            <input
              name="nombre"
              placeholder="Nombre"
              required
              className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
            <input
              name="telefono"
              placeholder="Teléfono"
              required
              className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-3 mt-3">
            <input
              name="origen"
              placeholder="Origen"
              required
              className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
              value={formData.origen}
              onChange={(e) => setFormData({ ...formData, origen: e.target.value })}
            />
            <input
              name="destino"
              placeholder="Destino"
              required
              className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
              value={formData.destino}
              onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-3 mt-3">
            <input
              type="date"
              name="fecha"
              className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
              value={formData.fecha}
              onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
            />
            <input
              type="time"
              name="hora"
              className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
              value={formData.hora}
              onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
            />
          </div>
          
          <textarea
            name="detalles"
            rows={6}
            placeholder="Detalles del servicio (nº de pasajeros, equipaje, paradas, instrucciones, etc.)"
            className="mt-3 w-full rounded-md border border-input px-3 py-2 outline-none focus:ring-2 focus:ring-ring/50"
            value={formData.detalles}
            onChange={(e) => setFormData({ ...formData, detalles: e.target.value })}
          />
          
          <div className="flex gap-3 pt-6">
            <Button type="submit" className="flex-1">
              Solicitar servicio
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  return mounted ? createPortal(modal, document.body) : null;
}





