<?php

namespace Models;

class StaticJob extends Job {

	// specific attributes
	public $job_container_id;

	// joined job container attributes
	public $job_container_start_time = 0;
	public $job_container_created_by_system_user_id;
	public $job_container_created_by_domain_user_id;
	public $job_container_enabled;
	public $job_container_sequence_mode;
	public $job_container_priority;
	public $job_container_agent_ip_ranges;
	public $job_container_time_frames;
	public $job_container_self_service;

}
