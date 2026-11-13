'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let renderer: THREE.WebGLRenderer | null = null
    let animId: number | null = null

    try {
      const w = container.clientWidth || window.innerWidth
      const h = container.clientHeight || window.innerHeight

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, w / h, 1, 1000)
      camera.position.set(0, 0, 300)

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      container.appendChild(renderer.domElement)

      const geo = new THREE.IcosahedronGeometry(60, 0)
      const edges = new THREE.EdgesGeometry(geo)
      const mat = new THREE.LineBasicMaterial({
        color: 0x10B981,
        transparent: true,
        opacity: 0.3,
      })
      const mesh = new THREE.LineSegments(edges, mat)
      scene.add(mesh)

      const innerGeo = new THREE.IcosahedronGeometry(40, 0)
      const innerEdges = new THREE.EdgesGeometry(innerGeo)
      const innerMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.1,
      })
      const innerMesh = new THREE.LineSegments(innerEdges, innerMat)
      scene.add(innerMesh)
      innerMesh.rotation.x = 0.3
      innerMesh.rotation.z = 0.5

      const particleCount = 180
      const pGeo = new THREE.BufferGeometry()
      const positions = new Float32Array(particleCount * 3)
      for (let i = 0; i < particleCount * 3; i++) positions[i] = (Math.random() - 0.5) * 300
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const pMat = new THREE.PointsMaterial({
        color: 0x10B981,
        size: 0.5,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
      })
      const particles = new THREE.Points(pGeo, pMat)
      scene.add(particles)

      function animate() {
        animId = requestAnimationFrame(animate)
        mesh.rotation.x += 0.001
        mesh.rotation.y += 0.003
        innerMesh.rotation.x += 0.0008
        innerMesh.rotation.y -= 0.002
        particles.rotation.x += 0.0003
        particles.rotation.y += 0.0005
        renderer!.render(scene, camera)
      }
      animate()

      const onResize = () => {
        const cw = container!.clientWidth || window.innerWidth
        const ch = container!.clientHeight || window.innerHeight
        camera.aspect = cw / ch
        camera.updateProjectionMatrix()
        renderer!.setSize(cw, ch)
      }
      window.addEventListener('resize', onResize, { passive: true })

      return () => {
        if (animId !== null) cancelAnimationFrame(animId)
        window.removeEventListener('resize', onResize)
        if (renderer) {
          renderer.dispose()
          if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement)
          }
        }
        geo.dispose()
        innerGeo.dispose()
        pGeo.dispose()
        pMat.dispose()
      }
    } catch (e) {
      console.warn('ThreeBackground: WebGL not available', e)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none transition-opacity duration-800"
    />
  )
}
